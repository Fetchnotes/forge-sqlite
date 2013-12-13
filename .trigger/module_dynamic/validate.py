import os
import validictory
import json

def json_schema(manifest, file, schema, **kw):
	file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'module', file))
	schema_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'schema', 'module_'+schema+'_schema.json'))
	
	with open(file_path, 'rb') as file_file:
		file_json = json.load(file_file)
	
	with open(schema_path, 'rb') as schema_file:
		schema_json = json.load(schema_file)
	
	validictory.validate(file_json, schema_json)

def valid_bundle(manifest, file, **kw):
	bundle_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'module', file))

	if not bundle_path.endswith(".bundle"):
		raise Exception("Folder '%s' is not a valid bundle, bundle names always end '.bundle'" % (file))