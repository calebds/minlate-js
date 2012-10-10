/*!
 * Minlate JS - v1.0 - 10/10/2012
 * 
 * Copyright (c) 2012 "Paislee" Caleb Sotelo
 * Dual licensed under the MIT and GPL licenses.
 * http://dev.paislee.net/about/license/
 */

/**
 * Example: paislee.net/minlate/minlate-test.html
 * 
 * minlate A miniature, logic-less templating function written in JavaScript.
 * 
 * This function requires two parameters. The first is a String value
 * representing the ID of a template node in the DOM. This node must have the
 * class 'minlate'. The second parameter is a simple Object mapping keys to
 * String values. The keys should correspond to places in the template markup
 * specified with {key}, and map[key] is the replacement value. Minlate
 * replaces all {keys} in the template with values by specified by map, and
 * returns the updated DOM node.
 * 
 * The third and fourth parameters are optional, and should be single character
 * Strings. If provided, these override the default start and end tokens for
 * replacement values. The defaults are open and close curly braces,
 * respectively.
 * 
 * Notes:
 * - Templates are initially hidden, becoming visible once rendered.
 * - If no ID is provided, the function returns null.
 * - If a key in the template is absent from the map, it is replaced with the
 *   empty string.
 * - This function may be called any number of times; the template will be
 *   updated in the DOM.
 * 
 * @param {String} id The ID of the template to be rendered
 * @param {Object} map A simple map of keys to String replacement values
 * @param {String} [start="{"] Optionally override the default start character
 * @param {String} [end="}"] Optionally override the default end character
 *  
 * @return The DOM node representing the rendered template, or null if no
 *  template is rendered
 */
var minlate = function(d) {

    var cssHide = ".minlate{display:none !important;}",
        cssEl = d.createElement("style"),
        mem = {}; // store used templates outside of DOM
    
    // add css rule to hide all templates
    cssEl.type = "text/css";
    if (cssEl.styleSheet) {
        cssEl.styleSheet.cssText = cssHide;
    } else {
        cssEl.appendChild(d.createTextNode(cssHide));
    }
    d.getElementsByTagName("head")[0].appendChild(cssEl);
    
    // public interface
    return function(id, map, start, end) {
        
        var buf = "",
            bufOpen = 0,
            ch = "",
            res = "",
            start = start || "{",
            end = end || "}",
            inDOM = d.getElementById(id),
            source = mem[id] || inDOM,
            copy = null,
            tmplt = null,
            map = map || {};
            
        if (source) {
          copy = source.cloneNode();
          tmplt = source.innerHTML;
        } else {
          return null;
        }
      
        // process template char by char, look for tokens
        for (var i = 0; i < tmplt.length; i++) {
            ch = tmplt.charAt(i);
            switch (ch) {
                case start:
                    bufOpen = 1;
                    break;
                case end:
                    res += map[buf] || "";
                    bufOpen = 0;
                    buf = "";
                    break;
                default:
                    if (bufOpen) {
                        buf += ch;
                    } else {
                        res += ch;
                    }
             }
        }
        
        // add rendered element to the DOM and save the template if necessary 
        copy.innerHTML = res;
        copy.className = copy.className.replace(/\bminlate\b/,"");
        mem[id] = mem[id] || source;
        inDOM.parentNode.replaceChild(copy, inDOM);
        return copy;
    };
     
}(document);