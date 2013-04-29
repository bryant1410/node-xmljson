var to_json = require('../lib').to_json;
var to_xml = require('../lib').to_xml;

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports['module basics'] = {
	'initializes': function (test) {
		test.expect(2);
		test.equal(typeof to_json, 'function', 'should be a function');
		test.equal(typeof to_xml, 'function', 'should be a function');
		test.done();
	}
};

// The below tests all follow the same format. XML and JSON strings are provided whose
// structure should be identical in terms of the translation provided by this module.
//
// The test logic translates XML to JSON, validates the JSON string is exactly as expected,
// then translates back to XML and validates the XML is identical to the starting XML.

exports['translates between json and xml'] = {

	'handles a simple dictionary': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2>val2</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":"val2",' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a top level array': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data type="array">' +
				'<item>val1</item>' +
				'<item>val2</item>' +
				'<item>val3</item>' +
			'</data>';

		var staticJson = '' +
			'[' +
				'"val1",' +
				'"val2",' +
				'"val3"' +
			']';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a top level array of arrays': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data type="array">' +
				'<item type="array"><item>val1</item><item>val2</item><item>val3</item></item>' +
				'<item type="array"><item>val4</item><item>val5</item><item>val6</item></item>' +
				'<item type="array"><item>val7</item><item>val8</item><item>val9</item></item>' +
			'</data>';

		var staticJson = '' +
			'[' +
				'["val1","val2","val3"],' +
				'["val4","val5","val6"],' +
				'["val7","val8","val9"]' +
			']';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a nested dictionary': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<obj1>' +
					'<objProp1>objVal1</objProp1>' +
				'</obj1>' +
				'<obj2>' +
					'<objProp2>objVal2</objProp2>' +
				'</obj2>' +
				'<obj3>' +
					'<objProp3>objVal3</objProp3>' +
				'</obj3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"obj1":{"objProp1":"objVal1"},' +
				'"obj2":{"objProp2":"objVal2"},' +
				'"obj3":{"objProp3":"objVal3"}' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles an array': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<array1 type="array">' +
					'<item>string 1</item>' +
					'<item>string 2</item>' +
					'<item>string 3</item>' +
				'</array1>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"array1":[' +
					'"string 1",' +
					'"string 2",' +
					'"string 3"' +
				']' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles an array of dictionaries': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<array1 type="array">' +
					'<item>' +
						'<objProp1>objVal1</objProp1>' +
					'</item>' +
					'<item>' +
						'<objProp2>objVal2</objProp2>' +
					'</item>' +
					'<item>' +
						'<objProp3>objVal3</objProp3>' +
					'</item>' +
				'</array1>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"array1":[' +
					'{"objProp1":"objVal1"},' +
					'{"objProp2":"objVal2"},' +
					'{"objProp3":"objVal3"}' +
				']' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles an array of arrays': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<array1 type="array">' +
					'<item type="array">' +
						'<item>objVal1</item><item>objVal2</item><item>objVal3</item>' +
					'</item>' +
					'<item type="array">' +
						'<item>objVal4</item><item>objVal5</item><item>objVal6</item>' +
					'</item>' +
					'<item type="array">' +
						'<item>objVal7</item><item>objVal8</item><item>objVal9</item>' +
					'</item>' +
				'</array1>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"array1":[' +
					'["objVal1","objVal2","objVal3"],' +
					'["objVal4","objVal5","objVal6"],' +
					'["objVal7","objVal8","objVal9"]' +
				']' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a number value': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2 type="num">3</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":3,' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a true value': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2 type="bool">true</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":true,' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a false value': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2 type="bool">false</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":false,' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a null value': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2 type="null">null</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":null,' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	}

};
