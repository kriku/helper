// ---------------------------------------------------------------------
//	local storage
// ---------------------------------------------------------------------
/*
var field = 'text';
var url = 'https://kriku.github.io/helper/text.txt';

var initLocalStorage = function(field, url) {
	if (window.localStorage.getItem(field) == null) {
		var r = new XMLHttpRequest();
		r.open('GET', url, true);
		r.onreadystatechange = function () {
			if (r.readyState != 4 || r.status != 200) return;
			console.log('Success: ' + r.responseText);
			window.localStorage.setItem(field, r.responseText);
		};
		r.send();
	}
}

initLocalStorage(field, url);
*/

// ---------------------------------------------------------------------
//	text analysis
// ---------------------------------------------------------------------

//TODO add textAnalysis
/*
var textAnalysis = function (word, text) {
	var textL = text.length;
	var wordL = word.length;

	var offsets = [];

	for (var i=0; i < textL; i++) {
		var right = 0;
		for (var j=0; j < wordL; j++) {
			if (text[i] == word[j]) right++;
			if (right/wordL > 0.7) break;
			if ((right-j)/wordL > 0.1) break;
		}
		if (right/wordL >= 0.7) offsets.push(i);
	}

	return offsets;
}
*/

// ---------------------------------------------------------------------
//	event listener on keypress
// ---------------------------------------------------------------------
var color = {idle: '#bbb', wait: '#eea', success: '#bd8', error: "#e88"}
var variants = {};

var variants = {};
var toggle = false;
var url = "http://q.test/";

var identifier = document.createElement('DIV');
identifier.style.position = 'fixed';
identifier.style.bottom = '10px';
identifier.style.left = '10px';
identifier.style.width = '10px';
identifier.style.height = '10px';
identifier.style.zIndex = '100000';
identifier.style.border = '2px solid #bbb';
identifier.style.borderRadius = '10px';
document.body.appendChild(identifier);


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
			  console.log('Success: ' + r.responseText);
        if (r.responseText=='') {
            identifier.style.borderColor = color.wait;
        } else {
            console.log(variants);
            for (i in variants) {
                if (textUnder(variants[i]).trim() == r.responseText) {
                    variants[i].style.color = "#f00";
                }
            }
            identifier.style.borderColor = color.success;
        }
			  //window.localStorage.setItem(field, r.responseText);
		};
    console.log('send: ' + text + ' !!!!to ' + url);
    identifier.style.borderColor = color.wait;
		r.send(text);
};


document.addEventListener('keypress', function (event) {


	if (!toggle) {

		if (event.shiftKey && event.charCode == 65) {
		    var selObj = window.getSelection();
		    var text = selObj.toString();
        console.log(text);

		    var selParent = selObj.anchorNode.parentNode;

        variants = {};
		    variants.length = 0;
        var prev;
		    while ((variants.length <= 0) && (selParent != window)) {
            prev = selParent;
		        selParent = selParent.parentNode;
		        variants = selParent.getElementsByTagName('input');
		    }

        console.log(textUnder(selParent));

        var variantsText = [];
		    for (var i in variants) {
            if ((variants[i].type == 'radio') || (variants[i].type == 'checkbox')) {
                if (variants[i].parentNode) {
                    var variantText = textUnder(variants[i].parentNode);
                    variantsText.push(variantText.trim());
                    //	place for text analysis with selected word (text)
                    // variants[i].parentNode.style.color = '#f00';
                    console.log(variantText);
                }
            }
		    }

        POST('data=' + JSON.stringify({
            "question": textUnder(prev),
            "answers": variantsText}));
		}
		toggle = true;
	} else {
		for (i in variants) {
			if ((variants[i].type == 'radio') || (variants[i].type == 'checkbox')) {
				variants[i].parentNode.style.color = '';
			}
		}
		toggle = false;
	}
});


