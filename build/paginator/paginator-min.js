(function(){var D=YAHOO.util.Dom,F=YAHOO.lang,B=F.isObject,E=F.isFunction,C=F.isArray,A=F.isString;function G(K){var N=G.VALUE_UNLIMITED,L,H,I,J,M;K=B(K)?K:{};this.initConfig();this.initEvents();this.set("rowsPerPage",K.rowsPerPage,true);if(G.isNumeric(K.totalRecords)){this.set("totalRecords",K.totalRecords,true);}this.initUIComponents();for(L in K){if(K.hasOwnProperty(L)){this.set(L,K[L],true);}}H=this.get("initialPage");I=this.get("totalRecords");J=this.get("rowsPerPage");if(H>1&&J!==N){M=(H-1)*J;if(I===N||M<I){this.set("recordOffset",M,true);}}}F.augmentObject(G,{id:0,ID_BASE:"yui-pg",VALUE_UNLIMITED:-1,TEMPLATE_DEFAULT:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}",TEMPLATE_ROWS_PER_PAGE:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} {RowsPerPageDropdown}",ui:{},isNumeric:function(H){return isFinite(+H);},toNumber:function(H){return isFinite(+H)?+H:null;}},true);G.prototype={_containers:[],_batch:false,_pageChanged:false,_state:null,initConfig:function(){var H=G.VALUE_UNLIMITED;this.setAttributeConfig("rowsPerPage",{value:0,validator:G.isNumeric,setter:G.toNumber});this.setAttributeConfig("containers",{value:null,validator:function(K){if(!C(K)){K=[K];}for(var J=0,I=K.length;J<I;++J){if(A(K[J])||(B(K[J])&&K[J].nodeType===1)){continue;}return false;}return true;},method:function(I){I=D.get(I);if(!C(I)){I=[I];}this._containers=I;}});this.setAttributeConfig("totalRecords",{value:0,validator:G.isNumeric,setter:G.toNumber});this.setAttributeConfig("recordOffset",{value:0,validator:function(J){var I=this.get("totalRecords");if(G.isNumeric(J)){J=+J;return I===H||I>J||(I===0&&J===0);}return false;},setter:G.toNumber});this.setAttributeConfig("initialPage",{value:1,validator:G.isNumeric,setter:G.toNumber});this.setAttributeConfig("template",{value:G.TEMPLATE_DEFAULT,validator:A});this.setAttributeConfig("containerClass",{value:"yui-pg-container",validator:A});this.setAttributeConfig("alwaysVisible",{value:true,validator:F.isBoolean});this.setAttributeConfig("updateOnChange",{value:false,validator:F.isBoolean});this.setAttributeConfig("id",{value:G.id++,readOnly:true});this.setAttributeConfig("rendered",{value:false,readOnly:true});},initUIComponents:function(){var J=G.ui,I,H;for(I in J){if(J.hasOwnProperty(I)){H=J[I];if(B(H)&&E(H.init)){H.init(this);}}}},initEvents:function(){this.createEvent("render");this.createEvent("rendered");this.createEvent("changeRequest");this.createEvent("pageChange");this.createEvent("beforeDestroy");this.createEvent("destroy");this._selfSubscribe();},_selfSubscribe:function(){this.subscribe("totalRecordsChange",this.updateVisibility,this,true);this.subscribe("alwaysVisibleChange",this.updateVisibility,this,true);this.subscribe("totalRecordsChange",this._handleStateChange,this,true);this.subscribe("recordOffsetChange",this._handleStateChange,this,true);this.subscribe("rowsPerPageChange",this._handleStateChange,this,true);this.subscribe("totalRecordsChange",this._syncRecordOffset,this,true);},_syncRecordOffset:function(K){var H=K.newValue,J,I;if(K.prevValue!==H){if(H!==G.VALUE_UNLIMITED){J=this.get("rowsPerPage");if(J&&this.get("recordOffset")>=H){I=this.getState({totalRecords:K.prevValue,recordOffset:this.get("recordOffset")});this.set("recordOffset",I.before.recordOffset);this._firePageChange(I);}}}},_handleStateChange:function(I){if(I.prevValue!==I.newValue){var J=this._state||{},H;J[I.type.replace(/Change$/,"")]=I.prevValue;H=this.getState(J);if(H.page!==H.before.page){if(this._batch){this._pageChanged=true;}else{this._firePageChange(H);}}}},_firePageChange:function(H){if(B(H)){var I=H.before;delete H.before;this.fireEvent("pageChange",{type:"pageChange",prevValue:H.page,newValue:I.page,prevState:H,newState:I});}},render:function(){if(this.get("rendered")){return this;}var M=this.get("totalRecords"),K=this.get("template"),L=this.getState(),J=G.ID_BASE+this.get("id")+"-",I,H;for(I=0,H=this._containers.length;I<H;++I){this._renderTemplate(this._containers[I],K,J+I,true);}this.updateVisibility();if(this._containers.length){this.setAttributeConfig("rendered",{value:true});this.fireEvent("render",L);this.fireEvent("rendered",L);}return this;},_renderTemplate:function(I,M,L,K){var O=this.get("containerClass"),N,J,H;if(!I){return;}D.setStyle(I,"display","none");D.addClass(I,O);I.innerHTML=M.replace(/\{([a-z0-9_ \-]+)\}/gi,'<span class="yui-pg-ui yui-pg-ui-$1"></span>');N=D.getElementsByClassName("yui-pg-ui","span",I);for(J=0,H=N.length;J<H;++J){this._renderUIComponent(N[J],L);}if(!K){D.setStyle(I,"display","");}},_renderUIComponent:function(H,M){var L=H.parentNode,K=/yui-pg-ui-(\w+)/.exec(H.className),J=K&&G.ui[K[1]],I;if(E(J)){I=new J(this);if(E(I.render)){L.replaceChild(I.render(M),H);}}},destroy:function(){this.fireEvent("beforeDestroy");this.fireEvent("destroy");this.setAttributeConfig("rendered",{value:false});},updateVisibility:function(M){var I=this.get("alwaysVisible"),O,N,K,L,J,H;if(!M||M.type==="alwaysVisibleChange"||!I){O=this.get("totalRecords");N=true;K=this.get("rowsPerPage");L=this.get("rowsPerPageOptions");if(C(L)){for(J=0,H=L.length;J<H;++J){K=Math.min(K,L[J]);}}if(O!==G.VALUE_UNLIMITED&&O<=K){N=false;}N=N||I;for(J=0,H=this._containers.length;J<H;++J){D.setStyle(this._containers[J],"display",N?"":"none");}}},getContainerNodes:function(){return this._containers;},getTotalPages:function(){var H=this.get("totalRecords"),I=this.get("rowsPerPage");if(!I){return null;}if(H===G.VALUE_UNLIMITED){return G.VALUE_UNLIMITED;}return Math.ceil(H/I);},hasPage:function(I){if(!F.isNumber(I)||I<1){return false;}var H=this.getTotalPages();return(H===G.VALUE_UNLIMITED||H>=I);},getCurrentPage:function(){var H=this.get("rowsPerPage");if(!H||!this.get("totalRecords")){return 0;}return Math.floor(this.get("recordOffset")/H)+1;},hasNextPage:function(){var H=this.getCurrentPage(),I=this.getTotalPages();return H&&(I===G.VALUE_UNLIMITED||H<I);},getNextPage:function(){return this.hasNextPage()?this.getCurrentPage()+1:null;
},hasPreviousPage:function(){return(this.getCurrentPage()>1);},getPreviousPage:function(){return(this.hasPreviousPage()?this.getCurrentPage()-1:1);},getPageRecords:function(K){if(!F.isNumber(K)){K=this.getCurrentPage();}var J=this.get("rowsPerPage"),I=this.get("totalRecords"),L,H;if(!K||!J){return null;}L=(K-1)*J;if(I!==G.VALUE_UNLIMITED){if(L>=I){return null;}H=Math.min(L+J,I)-1;}else{H=L+J-1;}return[L,H];},setPage:function(I,H){if(this.hasPage(I)&&I!==this.getCurrentPage()){if(this.get("updateOnChange")||H){this.set("recordOffset",(I-1)*this.get("rowsPerPage"));}else{this.fireEvent("changeRequest",this.getState({"page":I}));}}},getRowsPerPage:function(){return this.get("rowsPerPage");},setRowsPerPage:function(I,H){if(G.isNumeric(I)&&+I>0&&+I!==this.get("rowsPerPage")){if(this.get("updateOnChange")||H){this.set("rowsPerPage",I);}else{this.fireEvent("changeRequest",this.getState({"rowsPerPage":+I}));}}},getTotalRecords:function(){return this.get("totalRecords");},setTotalRecords:function(I,H){if(G.isNumeric(I)&&+I>=0&&+I!==this.get("totalRecords")){if(this.get("updateOnChange")||H){this.set("totalRecords",I);}else{this.fireEvent("changeRequest",this.getState({"totalRecords":+I}));}}},getStartIndex:function(){return this.get("recordOffset");},setStartIndex:function(I,H){if(G.isNumeric(I)&&+I>=0&&+I!==this.get("recordOffset")){if(this.get("updateOnChange")||H){this.set("recordOffset",I);}else{this.fireEvent("changeRequest",this.getState({"recordOffset":+I}));}}},getState:function(O){var Q=G.VALUE_UNLIMITED,L=Math,N=L.max,P=L.ceil,J,H,K;function I(S,M,R){if(S<=0||M===0){return 0;}if(M===Q||M>S){return S-(S%R);}return M-(M%R||R);}J={paginator:this,totalRecords:this.get("totalRecords"),rowsPerPage:this.get("rowsPerPage"),records:this.getPageRecords()};J.recordOffset=I(this.get("recordOffset"),J.totalRecords,J.rowsPerPage);J.page=P(J.recordOffset/J.rowsPerPage)+1;if(!O){return J;}H={paginator:this,before:J,rowsPerPage:O.rowsPerPage||J.rowsPerPage,totalRecords:(G.isNumeric(O.totalRecords)?N(O.totalRecords,Q):+J.totalRecords)};if(H.totalRecords===0){H.recordOffset=H.page=0;}else{K=G.isNumeric(O.page)?(O.page-1)*H.rowsPerPage:G.isNumeric(O.recordOffset)?+O.recordOffset:J.recordOffset;H.recordOffset=I(K,H.totalRecords,H.rowsPerPage);H.page=P(H.recordOffset/H.rowsPerPage)+1;}H.records=[H.recordOffset,H.recordOffset+H.rowsPerPage-1];if(H.totalRecords!==Q&&H.recordOffset<H.totalRecords&&H.records&&H.records[1]>H.totalRecords-1){H.records[1]=H.totalRecords-1;}return H;},setState:function(I){if(B(I)){this._state=this.getState({});I={page:I.page,rowsPerPage:I.rowsPerPage,totalRecords:I.totalRecords,recordOffset:I.recordOffset};if(I.page&&I.recordOffset===undefined){I.recordOffset=(I.page-1)*(I.rowsPerPage||this.get("rowsPerPage"));}this._batch=true;this._pageChanged=false;for(var H in I){if(I.hasOwnProperty(H)&&this._configs.hasOwnProperty(H)){this.set(H,I[H]);}}this._batch=false;if(this._pageChanged){this._pageChanged=false;this._firePageChange(this.getState(this._state));}}}};F.augmentProto(G,YAHOO.util.AttributeProvider);YAHOO.widget.Paginator=G;})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.CurrentPageReport=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("pageReportTemplateChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("pageReportClassChange",this.update,this,true);};B.ui.CurrentPageReport.init=function(C){C.setAttributeConfig("pageReportClass",{value:"yui-pg-current",validator:A.isString});C.setAttributeConfig("pageReportTemplate",{value:"({currentPage} of {totalPages})",validator:A.isString});C.setAttributeConfig("pageReportValueGenerator",{value:function(F){var E=F.getCurrentPage(),D=F.getPageRecords();return{"currentPage":D?E:0,"totalPages":F.getTotalPages(),"startIndex":D?D[0]:0,"endIndex":D?D[1]:0,"startRecord":D?D[0]+1:0,"endRecord":D?D[1]+1:0,"totalRecords":F.get("totalRecords")};},validator:A.isFunction});};B.ui.CurrentPageReport.sprintf=function(D,C){return D.replace(/\{([\w\s\-]+)\}/g,function(E,F){return(F in C)?C[F]:"";});};B.ui.CurrentPageReport.prototype={span:null,render:function(C){this.span=document.createElement("span");this.span.id=C+"-page-report";this.span.className=this.paginator.get("pageReportClass");this.update();return this.span;},update:function(C){if(C&&C.prevValue===C.newValue){return;}this.span.innerHTML=B.ui.CurrentPageReport.sprintf(this.paginator.get("pageReportTemplate"),this.paginator.get("pageReportValueGenerator")(this.paginator));},destroy:function(){this.span.parentNode.removeChild(this.span);this.span=null;}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.PageLinks=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("pageLinksChange",this.rebuild,this,true);C.subscribe("pageLinkClassChange",this.rebuild,this,true);C.subscribe("currentPageClassChange",this.rebuild,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("pageLinksContainerClassChange",this.rebuild,this,true);};B.ui.PageLinks.init=function(C){C.setAttributeConfig("pageLinkClass",{value:"yui-pg-page",validator:A.isString});C.setAttributeConfig("currentPageClass",{value:"yui-pg-current-page",validator:A.isString});C.setAttributeConfig("pageLinksContainerClass",{value:"yui-pg-pages",validator:A.isString});C.setAttributeConfig("pageLinks",{value:10,validator:B.isNumeric});C.setAttributeConfig("pageLabelBuilder",{value:function(D,E){return D;},validator:A.isFunction});};B.ui.PageLinks.calculateRange=function(E,F,D){var I=B.VALUE_UNLIMITED,H,C,G;if(!E||D===0||F===0||(F===I&&D===I)){return[0,-1];}if(F!==I){D=D===I?F:Math.min(D,F);}H=Math.max(1,Math.ceil(E-(D/2)));if(F===I){C=H+D-1;}else{C=Math.min(F,H+D-1);
}G=D-(C-H+1);H=Math.max(1,H-G);return[H,C];};B.ui.PageLinks.prototype={current:0,container:null,render:function(C){var D=this.paginator;this.container=document.createElement("span");this.container.id=C+"-pages";this.container.className=D.get("pageLinksContainerClass");YAHOO.util.Event.on(this.container,"click",this.onClick,this,true);this.update({newValue:null,rebuild:true});return this.container;},update:function(J){if(J&&J.prevValue===J.newValue){return;}var E=this.paginator,I=E.getCurrentPage();if(this.current!==I||!I||J.rebuild){var L=E.get("pageLabelBuilder"),H=B.ui.PageLinks.calculateRange(I,E.getTotalPages(),E.get("pageLinks")),D=H[0],F=H[1],K="",C,G;C='<a href="#" class="'+E.get("pageLinkClass")+'" page="';for(G=D;G<=F;++G){if(G===I){K+='<span class="'+E.get("currentPageClass")+" "+E.get("pageLinkClass")+'">'+L(G,E)+"</span>";}else{K+=C+G+'">'+L(G,E)+"</a>";}}this.container.innerHTML=K;}},rebuild:function(C){C.rebuild=true;this.update(C);},destroy:function(){YAHOO.util.Event.purgeElement(this.container,true);this.container.parentNode.removeChild(this.container);this.container=null;},onClick:function(D){var C=YAHOO.util.Event.getTarget(D);if(C&&YAHOO.util.Dom.hasClass(C,this.paginator.get("pageLinkClass"))){YAHOO.util.Event.stopEvent(D);this.paginator.setPage(parseInt(C.getAttribute("page"),10));}}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.FirstPageLink=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("firstPageLinkLabelChange",this.update,this,true);C.subscribe("firstPageLinkClassChange",this.update,this,true);};B.ui.FirstPageLink.init=function(C){C.setAttributeConfig("firstPageLinkLabel",{value:"&lt;&lt; first",validator:A.isString});C.setAttributeConfig("firstPageLinkClass",{value:"yui-pg-first",validator:A.isString});};B.ui.FirstPageLink.prototype={current:null,link:null,span:null,render:function(D){var E=this.paginator,F=E.get("firstPageLinkClass"),C=E.get("firstPageLinkLabel");this.link=document.createElement("a");this.span=document.createElement("span");this.link.id=D+"-first-link";this.link.href="#";this.link.className=F;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-first-span";this.span.className=F;this.span.innerHTML=C;this.current=E.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return;}var C=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()>1){if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}else{if(C&&this.current===this.link){C.replaceChild(this.span,this.current);this.current=this.span;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(1);}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.LastPageLink=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("lastPageLinkLabelChange",this.update,this,true);C.subscribe("lastPageLinkClassChange",this.update,this,true);};B.ui.LastPageLink.init=function(C){C.setAttributeConfig("lastPageLinkLabel",{value:"last &gt;&gt;",validator:A.isString});C.setAttributeConfig("lastPageLinkClass",{value:"yui-pg-last",validator:A.isString});};B.ui.LastPageLink.prototype={current:null,link:null,span:null,na:null,render:function(D){var F=this.paginator,G=F.get("lastPageLinkClass"),C=F.get("lastPageLinkLabel"),E=F.getTotalPages();this.link=document.createElement("a");this.span=document.createElement("span");this.na=this.span.cloneNode(false);this.link.id=D+"-last-link";this.link.href="#";this.link.className=G;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-last-span";this.span.className=G;this.span.innerHTML=C;this.na.id=D+"-last-na";switch(E){case B.VALUE_UNLIMITED:this.current=this.na;break;case F.getCurrentPage():this.current=this.span;break;default:this.current=this.link;}return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return;}var C=this.current?this.current.parentNode:null,E=this.link;if(C){switch(this.paginator.getTotalPages()){case B.VALUE_UNLIMITED:E=this.na;break;case this.paginator.getCurrentPage():E=this.span;break;}if(this.current!==E){C.replaceChild(E,this.current);this.current=E;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getTotalPages());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.NextPageLink=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("nextPageLinkLabelChange",this.update,this,true);C.subscribe("nextPageLinkClassChange",this.update,this,true);};B.ui.NextPageLink.init=function(C){C.setAttributeConfig("nextPageLinkLabel",{value:"next &gt;",validator:A.isString});C.setAttributeConfig("nextPageLinkClass",{value:"yui-pg-next",validator:A.isString});};B.ui.NextPageLink.prototype={current:null,link:null,span:null,render:function(D){var F=this.paginator,G=F.get("nextPageLinkClass"),C=F.get("nextPageLinkLabel"),E=F.getTotalPages();this.link=document.createElement("a");this.span=document.createElement("span");this.link.id=D+"-next-link";this.link.href="#";this.link.className=G;
this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-next-span";this.span.className=G;this.span.innerHTML=C;this.current=F.getCurrentPage()===E?this.span:this.link;return this.current;},update:function(E){if(E&&E.prevValue===E.newValue){return;}var D=this.paginator.getTotalPages(),C=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()!==D){if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}else{if(this.current===this.link){if(C){C.replaceChild(this.span,this.current);this.current=this.span;}}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getNextPage());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.PreviousPageLink=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("previousPageLinkLabelChange",this.update,this,true);C.subscribe("previousPageLinkClassChange",this.update,this,true);};B.ui.PreviousPageLink.init=function(C){C.setAttributeConfig("previousPageLinkLabel",{value:"&lt; prev",validator:A.isString});C.setAttributeConfig("previousPageLinkClass",{value:"yui-pg-previous",validator:A.isString});};B.ui.PreviousPageLink.prototype={current:null,link:null,span:null,render:function(D){var E=this.paginator,F=E.get("previousPageLinkClass"),C=E.get("previousPageLinkLabel");this.link=document.createElement("a");this.span=document.createElement("span");this.link.id=D+"-prev-link";this.link.href="#";this.link.className=F;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-prev-span";this.span.className=F;this.span.innerHTML=C;this.current=E.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return;}var C=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()>1){if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}else{if(C&&this.current===this.link){C.replaceChild(this.span,this.current);this.current=this.span;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getPreviousPage());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.RowsPerPageDropdown=function(C){this.paginator=C;C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("rowsPerPageOptionsChange",this.rebuild,this,true);C.subscribe("totalRecordsChange",this._handleTotalRecordsChange,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("rowsPerPageDropdownClassChange",this.rebuild,this,true);};B.ui.RowsPerPageDropdown.init=function(C){C.setAttributeConfig("rowsPerPageOptions",{value:[],validator:A.isArray});C.setAttributeConfig("rowsPerPageDropdownClass",{value:"yui-pg-rpp-options",validator:A.isString});};B.ui.RowsPerPageDropdown.prototype={select:null,all:null,render:function(C){this.select=document.createElement("select");this.select.id=C+"-rpp";this.select.className=this.paginator.get("rowsPerPageDropdownClass");this.select.title="Rows per page";YAHOO.util.Event.on(this.select,"change",this.onChange,this,true);this.rebuild();return this.select;},rebuild:function(J){var C=this.paginator,E=this.select,K=C.get("rowsPerPageOptions"),D,I,F,G,H;this.all=null;for(G=0,H=K.length;G<H;++G){I=K[G];D=E.options[G]||E.appendChild(document.createElement("option"));F=A.isValue(I.value)?I.value:I;D.innerHTML=A.isValue(I.text)?I.text:I;if(A.isString(F)&&F.toLowerCase()==="all"){this.all=D;D.value=C.get("totalRecords");}else{D.value=F;}}while(E.options.length>K.length){E.removeChild(E.firstChild);}this.update();},update:function(G){if(G&&G.prevValue===G.newValue){return;}var F=this.paginator.get("rowsPerPage")+"",D=this.select.options,E,C;for(E=0,C=D.length;E<C;++E){if(D[E].value===F){D[E].selected=true;break;}}},onChange:function(C){this.paginator.setRowsPerPage(parseInt(this.select.options[this.select.selectedIndex].value,10));},_handleTotalRecordsChange:function(C){if(!this.all||(C&&C.prevValue===C.newValue)){return;}this.all.value=C.newValue;if(this.all.selected){this.paginator.set("rowsPerPage",C.newValue);}},destroy:function(){YAHOO.util.Event.purgeElement(this.select);this.select.parentNode.removeChild(this.select);this.select=null;}};})();YAHOO.register("paginator",YAHOO.widget.Paginator,{version:"@VERSION@",build:"@BUILD@"});