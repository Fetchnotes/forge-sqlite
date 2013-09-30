from xml.etree import ElementTree
import json
import os
import shutil
from contextlib import contextmanager
import logging
from copy import deepcopy

import validictory

import build_steps
import build_steps_local
import build_steps_predicates
from xcode import XcodeProject

LOG = logging.getLogger(__name__)

@contextmanager
def cd(target_dir):
	'Change directory to :param:`target_dir` as a context manager - i.e. rip off Fabric'
	old_dir = os.getcwd()
	try:
		os.chdir(target_dir)
		yield target_dir
	finally:
		os.chdir(old_dir)

# Needed to prevent elementtree screwing with namespace names
ElementTree.register_namespace('android', 'http://schemas.android.com/apk/res/android')
ElementTree.register_namespace('tools', 'http://schemas.android.com/tools')

def dict_merge(a, b):
	'''recursively merges dict's. not just simple a['key'] = b['key'], if
	both a and b have a key who's value is a dict then dict_merge is called
	on both values and the result stored in the returned dictionary.'''
	if not isinstance(b, dict):
		return b
	result = deepcopy(a)
	for k, v in b.iteritems():
		if k in result and isinstance(result[k], dict):
				result[k] = dict_merge(result[k], v)
		else:
			result[k] = deepcopy(v)
	return result

def _call_with_params(method, build_params, params):
	if isinstance(params, dict):
		return method(build_params, **params)
	elif isinstance(params, tuple):
		return method(build_params, *params)
	else:
		return method(build_params, params)

def apply_module_to_osx_project(module_path, project_path, skip_framework=False, inspector_config=False, include_tests=False, local_build_steps=None, app_config=None):
	"""Take the module in a specific folder and apply it to an xcode ios project in another folder"""
	if not os.path.exists(os.path.join(module_path, 'manifest.json')):
		LOG.warning("Failed to include module: %s" % module_path)
		return
	with open(os.path.join(module_path, 'manifest.json')) as manifest_file:
		manifest = json.load(manifest_file)

	# JS
	if os.path.exists(os.path.join(module_path, 'javascript', 'module.js')):
		with open(os.path.join(module_path, 'javascript', 'module.js')) as module_js:
			with open(os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'all.js'), 'a') as alljs:
				alljs.write('(function () {\n')
				alljs.write(module_js.read())
				alljs.write('\n})();')

	# Tests
	if include_tests:
		if os.path.exists(os.path.join(module_path, 'tests', 'fixtures')):
			if os.path.exists(os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures', manifest['name'])):
				shutil.rmtree(os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures', manifest['name']))
			if not os.path.exists(os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures')):
				os.makedirs(os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures'))
			shutil.copytree(os.path.join(module_path, 'tests', 'fixtures'), os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures', manifest['name']))
		if os.path.exists(os.path.join(module_path, 'tests', 'automated.js')):
			try:
				os.makedirs(os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'tests', 'automated'))
			except OSError:
				pass
			shutil.copy2(os.path.join(module_path, 'tests', 'automated.js'), os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'tests', 'automated', manifest['name']+'.js'))
		if os.path.exists(os.path.join(module_path, 'tests', 'interactive.js')):
			try:
				os.makedirs(os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'tests', 'interactive'))
			except OSError:
				pass
			shutil.copy2(os.path.join(module_path, 'tests', 'interactive.js'), os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'tests', 'interactive', manifest['name']+'.js'))

	# Add module a if we want it
	if not skip_framework:
		module_framework = os.path.join(module_path, 'osx', '%s.framework' % manifest['name'])
		if os.path.isdir(module_framework):
			shutil.copytree(module_framework, os.path.join(project_path, '%s.framework' % manifest['name']))
			xcode_project = XcodeProject(os.path.join(project_path, 'ForgeInspector.xcodeproj', 'project.pbxproj'))
			xcode_project.add_framework(manifest['name']+'.framework', "<group>")
			xcode_project.add_saved_framework(manifest['name']+'.framework', "<group>")
			xcode_project.save()

	if inspector_config:
		# Add inspector config for module to app_config.js(on).
		if app_config is None:
			with open(os.path.join(project_path, 'ForgeInspector', 'assets', 'app_config.json')) as app_config_json:
				app_config = json.load(app_config_json)
		if os.path.exists(os.path.join(module_path, 'inspector_config.json')):
			with open(os.path.join(module_path, 'inspector_config.json'), "r") as inspector_config_file:
				inspector_config = json.load(inspector_config_file)
		else:
			inspector_config = {
				"modules": {
					manifest['name']: {
						"version": "exampleversion"
					}
				}
			}

		app_config = dict_merge(app_config, inspector_config)

		with open(os.path.join(project_path, 'ForgeInspector', 'assets', 'app_config.json'), 'w') as app_config_json:
			json.dump(app_config, app_config_json)
		with open(os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'app_config.js'), 'w') as app_config_js:
			app_config_js.write("window.forge = {}; window.forge.config = %s;" % json.dumps(app_config))

	# Validate config
	if os.path.exists(os.path.join(module_path, 'config_schema.json')) and \
			"config" in app_config['modules'][manifest['name']]:
		with open(os.path.join(module_path, 'config_schema.json')) as schema_file:
			config_schema = json.load(schema_file)

		try:
			validictory.validate(app_config['modules'][manifest['name']]['config'], config_schema)
		except validictory.ValidationError as e:
			raise Exception("Validation failed for module '%s' with error: %s" % (manifest['name'], str(e)))

	# frameworks
	module_frameworks = os.path.join(module_path, 'osx', 'frameworks')
	if os.path.isdir(module_frameworks):
		if os.path.exists(os.path.join(project_path, 'ForgeModule')):
			xcode_project = XcodeProject(os.path.join(project_path, 'ForgeModule', 'ForgeModule.xcodeproj', 'project.pbxproj'))
		xcode_inspector_project = XcodeProject(os.path.join(project_path, 'ForgeInspector.xcodeproj', 'project.pbxproj'))
		for framework in os.listdir(module_frameworks):
			if framework.endswith(".framework"):
				shutil.copytree(os.path.join(module_frameworks, framework), os.path.join(project_path, framework))
				if os.path.exists(os.path.join(project_path, 'ForgeModule')):
					xcode_project.add_framework(os.path.join('..', framework), '<group>')
				xcode_inspector_project.add_saved_framework(framework, '<group>')
		
		if os.path.exists(os.path.join(project_path, 'ForgeModule')):
			xcode_project.save()
		xcode_inspector_project.save()

	# build steps
	module_steps_path = os.path.join(module_path, 'osx', 'build_steps.json')
	if os.path.isfile(module_steps_path):
		with open(module_steps_path, 'r') as build_steps_file:
			module_build_steps = json.load(build_steps_file)
			with cd(project_path):
				build_params = {
					'app_config': app_config,
					'project_path': project_path,
					'src_path': local_build_steps
				}
				for step in module_build_steps:
					if "do" in step:
						for task in step["do"]:
							task_func = getattr(build_steps, task, None)
							if task_func is not None:
								_call_with_params(task_func, build_params, step["do"][task])
							elif local_build_steps is not None:
								task_func = getattr(build_steps_local, task, None)
								if task_func is not None:
									_call_with_params(task_func, build_params, step["do"][task])

		if local_build_steps is None:
			if not os.path.exists(os.path.join(project_path, "dist", "build_steps")):
				os.makedirs(os.path.join(project_path, "dist", "build_steps"))
			shutil.copy2(module_steps_path, os.path.join(project_path, "dist", "build_steps", manifest['name'] + ".json"))


def apply_module_to_ios_project(module_path, project_path, skip_a=False, inspector_config=False, include_tests=False, local_build_steps=None, app_config=None):
	"""Take the module in a specific folder and apply it to an xcode ios project in another folder"""
	if not os.path.exists(os.path.join(module_path, 'manifest.json')):
		LOG.warning("Failed to include module: %s" % module_path)
		return
	with open(os.path.join(module_path, 'manifest.json')) as manifest_file:
		manifest = json.load(manifest_file)

	# JS
	if os.path.exists(os.path.join(module_path, 'javascript', 'module.js')):
		LOG.info("iOS module '%s': Appending module.js to all.js" % manifest['name'])
		with open(os.path.join(module_path, 'javascript', 'module.js')) as module_js:
			with open(os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'all.js'), 'a') as alljs:
				alljs.write('(function () {\n')
				alljs.write(module_js.read())
				alljs.write('\n})();')

	# Tests
	if include_tests:
		LOG.info("iOS module '%s': Including test files" % manifest['name'])
		if os.path.exists(os.path.join(module_path, 'tests', 'fixtures')):
			if os.path.exists(os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures', manifest['name'])):
				shutil.rmtree(os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures', manifest['name']))
			if not os.path.exists(os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures')):
				os.makedirs(os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures'))
			shutil.copytree(os.path.join(module_path, 'tests', 'fixtures'), os.path.join(project_path, 'ForgeInspector', 'assets', 'src', 'fixtures', manifest['name']))
		if os.path.exists(os.path.join(module_path, 'tests', 'automated.js')):
			try:
				os.makedirs(os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'tests', 'automated'))
			except OSError:
				pass
			shutil.copy2(os.path.join(module_path, 'tests', 'automated.js'), os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'tests', 'automated', manifest['name']+'.js'))
		if os.path.exists(os.path.join(module_path, 'tests', 'interactive.js')):
			try:
				os.makedirs(os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'tests', 'interactive'))
			except OSError:
				pass
			shutil.copy2(os.path.join(module_path, 'tests', 'interactive.js'), os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'tests', 'interactive', manifest['name']+'.js'))

	# Add module a if we want it
	if not skip_a:
		LOG.info("iOS module '%s': Including module.a" % manifest['name'])
		module_a = os.path.join(module_path, 'ios', 'module.a')
		if os.path.isfile(module_a):
			# Copy to libs
			shutil.copy2(module_a, os.path.join(project_path, manifest['name']+'.a'))
			
			# Add to xcode build
			xcode_project = XcodeProject(os.path.join(project_path, 'ForgeInspector.xcodeproj', 'project.pbxproj'))
			xcode_project.add_framework(manifest['name']+'.a', "<group>")
			xcode_project.save()

	if inspector_config:
		LOG.info("iOS module '%s': Including inspector config" % manifest['name'])
		if app_config is None:
			with open(os.path.join(project_path, 'ForgeInspector', 'assets', 'app_config.json')) as app_config_json:
				app_config = json.load(app_config_json)
		if os.path.exists(os.path.join(module_path, 'inspector_config.json')):
			with open(os.path.join(module_path, 'inspector_config.json'), "r") as inspector_config_file:
				inspector_config = json.load(inspector_config_file)
		else:
			inspector_config = {
				"modules": {
					manifest['name']: {
						"version": "exampleversion"
					}
				}
			}

		app_config = dict_merge(app_config, inspector_config)

		with open(os.path.join(project_path, 'ForgeInspector', 'assets', 'app_config.json'), 'w') as app_config_json:
			json.dump(app_config, app_config_json)
		with open(os.path.join(project_path, 'ForgeInspector', 'assets', 'forge', 'app_config.js'), 'w') as app_config_js:
			app_config_js.write("window.forge = {}; window.forge.config = %s;" % json.dumps(app_config))

	# Validate config
	if os.path.exists(os.path.join(module_path, 'config_schema.json')) and \
			"config" in app_config['modules'][manifest['name']]:
		with open(os.path.join(module_path, 'config_schema.json')) as schema_file:
			config_schema = json.load(schema_file)

		try:
			validictory.validate(app_config['modules'][manifest['name']]['config'], config_schema)
		except validictory.ValidationError as e:
			raise Exception("Validation failed for module '%s' with error: %s" % (manifest['name'], str(e)))

	# bundles
	module_bundles = os.path.join(module_path, 'ios', 'bundles')
	if os.path.isdir(module_bundles):
		LOG.info("iOS module '%s': Including bundles" % manifest['name'])
		xcode_project = XcodeProject(os.path.join(project_path, 'ForgeInspector.xcodeproj', 'project.pbxproj'))
		for bundle in os.listdir(module_bundles):
			if bundle.endswith(".bundle"):
				shutil.copytree(os.path.join(module_bundles, bundle), os.path.join(project_path, bundle))
				xcode_project.add_resource(bundle)
			
		xcode_project.save()

	# build steps
	module_steps_path = os.path.join(module_path, 'ios', 'build_steps.json')
	if os.path.isfile(module_steps_path):
		LOG.info("iOS module '%s': Applying build steps" % manifest['name'])
		with open(module_steps_path, 'r') as build_steps_file:
			module_build_steps = json.load(build_steps_file)
			with cd(project_path):
				build_params = {
					'app_config': app_config,
					'project_path': project_path,
					'src_path': local_build_steps
				}
				for step in module_build_steps:
					if "when" in step:
						should_continue = False
						for predicate in step["when"]:
							predicate_func = getattr(build_steps_predicates, predicate, None)
							if predicate_func is not None:
								if not _call_with_params(predicate_func, build_params, step["when"][predicate]):
									should_continue = True
									break
							else:
								should_continue = True
								break
						if should_continue:
							continue
					if "do" in step:
						for task in step["do"]:
							task_func = getattr(build_steps, task, None)
							if task_func is not None:
								_call_with_params(task_func, build_params, step["do"][task])
							elif local_build_steps is not None:
								task_func = getattr(build_steps_local, task, None)
								if task_func is not None:
									_call_with_params(task_func, build_params, step["do"][task])

		if local_build_steps is None:
			if not os.path.exists(os.path.join(project_path, "dist", "build_steps")):
				os.makedirs(os.path.join(project_path, "dist", "build_steps"))
			shutil.copy2(module_steps_path, os.path.join(project_path, "dist", "build_steps", manifest['name'] + ".json"))


def apply_module_to_android_project(module_path, project_path, skip_jar=False, inspector_config=False, include_tests=False, local_build_steps=None, app_config=None):
	"""Take the module in a specific folder and apply it to an eclipse android project in another folder"""
	if not os.path.exists(os.path.join(module_path, 'manifest.json')):
		LOG.warning("Failed to include module: %s" % module_path)
		return
	with open(os.path.join(module_path, 'manifest.json')) as manifest_file:
		manifest = json.load(manifest_file)

	# JS
	if os.path.exists(os.path.join(module_path, 'javascript', 'module.js')):
		LOG.info("Android module '%s': Appending module.js to all.js" % manifest['name'])
		with open(os.path.join(module_path, 'javascript', 'module.js')) as module_js:
			with open(os.path.join(project_path, 'assets', 'forge', 'all.js'), 'a') as alljs:
				alljs.write('(function () {\n')
				alljs.write(module_js.read())
				alljs.write('\n})();')

	# Tests
	if include_tests:
		LOG.info("Android module '%s': Including test files" % manifest['name'])
		if os.path.exists(os.path.join(module_path, 'tests', 'fixtures')):
			if os.path.exists(os.path.join(project_path, 'assets', 'src', 'fixtures', manifest['name'])):
				shutil.rmtree(os.path.join(project_path, 'assets', 'src', 'fixtures', manifest['name']))
			if not os.path.exists(os.path.join(project_path, 'assets', 'src', 'fixtures')):
				os.makedirs(os.path.join(project_path, 'assets', 'src', 'fixtures'))
			shutil.copytree(os.path.join(module_path, 'tests', 'fixtures'), os.path.join(project_path, 'assets', 'src', 'fixtures', manifest['name']))
		if os.path.exists(os.path.join(module_path, 'tests', 'automated.js')):
			try:
				os.makedirs(os.path.join(project_path, 'assets', 'forge', 'tests', 'automated'))
			except OSError:
				pass
			shutil.copy2(os.path.join(module_path, 'tests', 'automated.js'), os.path.join(project_path, 'assets', 'forge', 'tests', 'automated', manifest['name']+'.js'))
		if os.path.exists(os.path.join(module_path, 'tests', 'interactive.js')):
			try:
				os.makedirs(os.path.join(project_path, 'assets', 'forge', 'tests', 'interactive'))
			except OSError:
				pass
			shutil.copy2(os.path.join(module_path, 'tests', 'interactive.js'), os.path.join(project_path, 'assets', 'forge', 'tests', 'interactive', manifest['name']+'.js'))

	# Add module jar if we want it
	if not skip_jar:
		LOG.info("Android module '%s': Adding module jar to libs" % manifest['name'])
		module_jar = os.path.join(module_path, 'android', 'module.jar')
		if not os.path.exists(os.path.join(project_path, 'libs')):
			os.makedirs(os.path.join(project_path, 'libs'))
		if os.path.exists(module_jar):
			shutil.copy2(module_jar, os.path.join(project_path, 'libs', manifest['name']+'.jar'))
	
	if inspector_config:
		LOG.info("Android module '%s': Including inspector config" % manifest['name'])
		if app_config is None:
			with open(os.path.join(project_path, 'assets', 'app_config.json')) as app_config_json:
				app_config = json.load(app_config_json)
		if os.path.exists(os.path.join(module_path, 'inspector_config.json')):
			with open(os.path.join(module_path, 'inspector_config.json'), "r") as inspector_config_file:
				inspector_config = json.load(inspector_config_file)
		else:
			inspector_config = {
				"modules": {
					manifest['name']: {
						"version": "exampleversion"
					}
				}
			}

		app_config = dict_merge(app_config, inspector_config)
		
		with open(os.path.join(project_path, 'assets', 'app_config.json'), 'w') as app_config_json:
			json.dump(app_config, app_config_json)
		with open(os.path.join(project_path, 'assets', 'forge', 'app_config.js'), 'w') as app_config_js:
			app_config_js.write("window.forge = {}; window.forge.config = %s;" % json.dumps(app_config))

	# Validate config
	if os.path.exists(os.path.join(module_path, 'config_schema.json')) and \
			"config" in app_config['modules'][manifest['name']]:
		with open(os.path.join(module_path, 'config_schema.json')) as schema_file:
			config_schema = json.load(schema_file)

		try:
			validictory.validate(app_config['modules'][manifest['name']]['config'], config_schema)
		except validictory.ValidationError as e:
			raise Exception("Validation failed for module '%s' with error: %s" % (manifest['name'], str(e)))

	# res
	module_res = os.path.join(module_path, 'android', 'res')
	if os.path.isdir(module_res):
		LOG.info("Android module '%s': Adding module res files" % manifest['name'])
		for dirpath, _, filenames in os.walk(module_res):
			if not os.path.exists(os.path.join(project_path, 'res', dirpath[len(module_res)+1:])):
				os.makedirs(os.path.join(project_path, 'res', dirpath[len(module_res)+1:]))
			for filename in filenames:
				if (filename.startswith('.')):
					continue
				if os.path.exists(os.path.join(project_path, 'res', dirpath[len(module_res)+1:], filename)):
					raise Exception("File '%s' already exists, module resources may only add files, not replace them." % os.path.join('res', dirpath[len(module_res)+1:], filename))
				shutil.copy2(os.path.join(dirpath, filename), os.path.join(project_path, 'res', dirpath[len(module_res)+1:], filename))

	# libs
	module_res = os.path.join(module_path, 'android', 'libs')
	if os.path.isdir(module_res):
		LOG.info("Android module '%s': Adding module lib files" % manifest['name'])
		for dirpath, _, filenames in os.walk(module_res):
			if not os.path.exists(os.path.join(project_path, 'libs', dirpath[len(module_res)+1:])):
				os.makedirs(os.path.join(project_path, 'libs', dirpath[len(module_res)+1:]))
			for filename in filenames:
				shutil.copy2(os.path.join(dirpath, filename), os.path.join(project_path, 'libs', dirpath[len(module_res)+1:], filename))

	# build steps
	if os.path.isfile(os.path.join(module_path, 'android', 'build_steps.json')):
		LOG.info("Android module '%s': Performing build steps" % manifest['name'])
		with open(os.path.join(module_path, 'android', 'build_steps.json')) as build_steps_file:
			module_build_steps = json.load(build_steps_file)
			with cd(project_path):
				build_params = {
					'app_config': app_config,
					'project_path': project_path,
					'src_path': local_build_steps
				}
				for step in module_build_steps:
					if "do" in step:
						for task in step["do"]:
							task_func = getattr(build_steps, task, None)
							if task_func is not None:
								_call_with_params(task_func, build_params, step["do"][task])
							elif local_build_steps is not None:
								task_func = getattr(build_steps_local, task, None)
								if task_func is not None:
									_call_with_params(task_func, build_params, step["do"][task])

		if local_build_steps is None:
			module_steps_path = os.path.join(module_path, 'android', 'build_steps.json')
			if not os.path.exists(os.path.join(project_path, "build_steps")):
				os.makedirs(os.path.join(project_path, "build_steps"))
			shutil.copy2(module_steps_path, os.path.join(project_path, "build_steps", manifest['name'] + ".json"))
