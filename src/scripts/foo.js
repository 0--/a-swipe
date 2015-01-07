(function(){
	function foo(){
		alert && alert("FOO");
	}
	function bar(){
		alert && alert("BAR");
	}

	window.BAR = bar;
	window.FOO = foo;
	return foo;
}());