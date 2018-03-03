jQuery(document).ready(function($){
 	var range, selection; 
	var SelectText = function(element) {
		
		if (document.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		} else if (window.getSelection) {
			selection = window.getSelection();        
			range = document.createRange();
			range.selectNodeContents(element);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	};
	var CopyText = function(element) {
			SelectText(element);	
			document.execCommand("copy",false,null);
	}
	$(".code").each(function() {
		var code = $(this).get(0);
		var numberrgb = new Number(Math.round(Math.random()*0xffffff));
		var color = new String(numberrgb.toString(16));
		var buttoncopy_html = 
			'<div 		style="position: fixed;'                                                         +
						'right: 1%;'                                                                   +
						'margin-top:  5px;'                                                              +
						'cursor: pointer;'                                                               +
						'color:#'+color+';'                                                              +
						'">'																			+
			'<i class="fa fa-clipboard fa-2x"></i>'
			'</div>';
		var buttoncopy = $(buttoncopy_html);
		$(buttoncopy).click(function() {
			CopyText(code);
		});
		$(buttoncopy).insertBefore(this);
	});
});




			






