// ---------------------------------------------------------------------
//	local storage
// ---------------------------------------------------------------------
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


// ---------------------------------------------------------------------
//	text analysis
// ---------------------------------------------------------------------

//TODO add textAnalysis
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


// ---------------------------------------------------------------------
//	event listener on keypress
// ---------------------------------------------------------------------

var toggle = false;
var variants = {};

document.addEventListener('keypress', function (event) {
	var textNodesUnder = function (el) {
		var n, a=[], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
		while (n = walk.nextNode()) a.push(n);
		return a;
	}

	var textUnder = function (el) {
		var n, a='', walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
		while (n = walk.nextNode()) a += " " + n.textContent;
		return a;
	}

	if (!toggle) {

		if (event.shiftKey && event.charCode == 65) {
		    var selObj = window.getSelection();
		    var text = selObj.toString();
			console.log(text);

		    var selParent = selObj.anchorNode.parentNode;

        variants = {};
		    variants.length = 0;
		    while ((variants.length <= 0) && (selParent != window)) {
		        selParent = selParent.parentNode;
		        variants = selParent.getElementsByTagName('input');
		    }

		    for (i in variants) {
				if ((variants[i].type == 'radio') || (variants[i].type == 'checkbox')) {
				    if (variants[i].parentNode) {
						var variantText = textUnder(variants[i].parentNode);
						//	place for text analysis with selected word (text)
						variants[i].parentNode.style.color = '#f00';
						console.log(variantText);
				    }
				}
		    }
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


