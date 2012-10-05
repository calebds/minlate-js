var minlate = function(d) {

    var cssHide = ".template{display:none !important;}",
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
        copy.className = copy.className.replace(/\btemplate\b/,"");
        mem[id] = mem[id] || source;
        inDOM.parentNode.replaceChild(copy, inDOM);
        return copy;
    };
     
}(document);