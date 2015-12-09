// ---------------------------------------------------------------------
//	event listener on keypress
// ---------------------------------------------------------------------
var variants = {};
var url = "http://q.test/";

var textNodesUnder = function (el) {
		var n, a=[], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
		while (n = walk.nextNode()) a.push(n);
		return a;
};

var textUnder = function (el) {
		var n, a='', walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
		while (n = walk.nextNode()) a += " " + n.textContent;
		return a;
};

var POST = function (text) {
    var r = new XMLHttpRequest();
    r.open('POST', url, true);
    r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    r.onreadystatechange = function () {
			  if (r.readyState != 4 || r.status != 200) return;
        if (r.responseText!='') {
            for (i in variants) {
                if ((variants[i].type == 'radio') || (variants[i].type == 'checkbox')) {
                    if (variants[i].parentNode) {
                        var variantText = textUnder(variants[i].parentNode).trim();
                        if (variantText == r.responseText) {
                            variants[i].focus();
                        }
                    }
                }
            }
        }
		};
		r.send(text);
};


document.addEventListener('keypress', function (event) {
    if (event.shiftKey && event.charCode == 65) {
        var selObj = window.getSelection();
        var text = selObj.toString();

        var selParent = selObj.anchorNode.parentNode;

        variants = {};
        variants.length = 0;
        var prev;
        while ((variants.length <= 0) && (selParent != window)) {
            prev = selParent;
            selParent = selParent.parentNode;
            variants = selParent.getElementsByTagName('input');
        }

        var variantsText = [];
        for (var i in variants) {
            if ((variants[i].type == 'radio') || (variants[i].type == 'checkbox')) {
                if (variants[i].parentNode) {
                    var variantText = textUnder(variants[i].parentNode);
                    variantsText.push(variantText.trim());
                }
            }
        }

        POST('data=' + JSON.stringify({
            "question": textUnder(prev),
            "answers": variantsText}));
    }
});


