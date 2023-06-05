"use strict";(self.webpackChunksqlitegns=self.webpackChunksqlitegns||[]).push([[1258],{1258:function(e,t,r){r.r(t),r.d(t,{Adapter:function(){return F},CodeActionAdaptor:function(){return G},DefinitionAdapter:function(){return M},DiagnosticsAdapter:function(){return L},FormatAdapter:function(){return U},FormatHelper:function(){return B},FormatOnTypeAdapter:function(){return z},InlayHintsAdapter:function(){return J},Kind:function(){return H},LibFiles:function(){return I},OccurrencesAdapter:function(){return K},OutlineAdapter:function(){return E},QuickInfoAdapter:function(){return N},ReferenceAdapter:function(){return R},RenameAdapter:function(){return q},SignatureHelpAdapter:function(){return O},SuggestAdapter:function(){return T},WorkerManager:function(){return S},flattenDiagnosticMessageText:function(){return A},getJavaScriptWorker:function(){return Y},getTypeScriptWorker:function(){return $},setupJavaScript:function(){return X},setupTypeScript:function(){return Q}});var n,i,s=r(1413),a=r(4506),o=r(7326),u=r(136),c=r(7277),l=r(4165),f=r(5861),p=r(5671),d=r(3144),g=r(4942),b=r(7762),m=r(4389),h=r(4104),v=Object.defineProperty,y=Object.getOwnPropertyDescriptor,k=Object.getOwnPropertyNames,x=Object.prototype.hasOwnProperty,_=function(e,t,r,n){if(t&&"object"===typeof t||"function"===typeof t){var i,s=(0,b.Z)(k(t));try{var a=function(){var s=i.value;x.call(e,s)||s===r||v(e,s,{get:function(){return t[s]},enumerable:!(n=y(t,s))||n.enumerable})};for(s.s();!(i=s.n()).done;)a()}catch(o){s.e(o)}finally{s.f()}}return e},Z=function(e,t,r){return function(e,t,r){t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r}(e,"symbol"!==typeof t?t+"":t,r),r},w={};_(w,n=m,"default"),i&&_(i,n,"default");var S=function(){function e(t,r){var n=this;(0,p.Z)(this,e),(0,g.Z)(this,"_configChangeListener",void 0),(0,g.Z)(this,"_updateExtraLibsToken",void 0),(0,g.Z)(this,"_extraLibsChangeListener",void 0),(0,g.Z)(this,"_worker",void 0),(0,g.Z)(this,"_client",void 0),this._modeId=t,this._defaults=r,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((function(){return n._stopWorker()})),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((function(){return n._updateExtraLibs()}))}return(0,d.Z)(e,[{key:"dispose",value:function(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()}},{key:"_stopWorker",value:function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}},{key:"_updateExtraLibs",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(){var t,r;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._worker){e.next=2;break}return e.abrupt("return");case 2:return t=++this._updateExtraLibsToken,e.next=5,this._worker.getProxy();case 5:if(r=e.sent,this._updateExtraLibsToken===t){e.next=8;break}return e.abrupt("return");case 8:r.updateExtraLibs(this._defaults.getExtraLibs());case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_getClient",value:function(){var e=this;return this._client||(this._client=(0,f.Z)((0,l.Z)().mark((function t(){return(0,l.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e._worker=w.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:e._modeId,keepIdleModels:!0,createData:{compilerOptions:e._defaults.getCompilerOptions(),extraLibs:e._defaults.getExtraLibs(),customWorkerPath:e._defaults.workerOptions.customWorkerPath,inlayHintsOptions:e._defaults.inlayHintsOptions}}),!e._defaults.getEagerModelSync()){t.next=5;break}return t.next=4,e._worker.withSyncedResources(w.editor.getModels().filter((function(t){return t.getLanguageId()===e._modeId})).map((function(e){return e.uri})));case 4:case 7:return t.abrupt("return",t.sent);case 5:return t.next=7,e._worker.getProxy();case 8:case"end":return t.stop()}}),t)})))()),this._client}},{key:"getLanguageServiceWorker",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(){var t,r,n,i,s=arguments;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getClient();case 2:if(t=e.sent,!this._worker){e.next=7;break}for(r=s.length,n=new Array(r),i=0;i<r;i++)n[i]=s[i];return e.next=7,this._worker.withSyncedResources(n);case 7:return e.abrupt("return",t);case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),C={};function A(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if("string"===typeof e)return e;if(void 0===e)return"";var n="";if(r){n+=t;for(var i=0;i<r;i++)n+="  "}if(n+=e.messageText,r++,e.next){var s,a=(0,b.Z)(e.next);try{for(a.s();!(s=a.n()).done;){var o=s.value;n+=A(o,t,r)}}catch(u){a.e(u)}finally{a.f()}}return n}function D(e){return e?e.map((function(e){return e.text})).join(""):""}C["lib.d.ts"]=!0,C["lib.dom.d.ts"]=!0,C["lib.dom.iterable.d.ts"]=!0,C["lib.es2015.collection.d.ts"]=!0,C["lib.es2015.core.d.ts"]=!0,C["lib.es2015.d.ts"]=!0,C["lib.es2015.generator.d.ts"]=!0,C["lib.es2015.iterable.d.ts"]=!0,C["lib.es2015.promise.d.ts"]=!0,C["lib.es2015.proxy.d.ts"]=!0,C["lib.es2015.reflect.d.ts"]=!0,C["lib.es2015.symbol.d.ts"]=!0,C["lib.es2015.symbol.wellknown.d.ts"]=!0,C["lib.es2016.array.include.d.ts"]=!0,C["lib.es2016.d.ts"]=!0,C["lib.es2016.full.d.ts"]=!0,C["lib.es2017.d.ts"]=!0,C["lib.es2017.full.d.ts"]=!0,C["lib.es2017.intl.d.ts"]=!0,C["lib.es2017.object.d.ts"]=!0,C["lib.es2017.sharedmemory.d.ts"]=!0,C["lib.es2017.string.d.ts"]=!0,C["lib.es2017.typedarrays.d.ts"]=!0,C["lib.es2018.asyncgenerator.d.ts"]=!0,C["lib.es2018.asynciterable.d.ts"]=!0,C["lib.es2018.d.ts"]=!0,C["lib.es2018.full.d.ts"]=!0,C["lib.es2018.intl.d.ts"]=!0,C["lib.es2018.promise.d.ts"]=!0,C["lib.es2018.regexp.d.ts"]=!0,C["lib.es2019.array.d.ts"]=!0,C["lib.es2019.d.ts"]=!0,C["lib.es2019.full.d.ts"]=!0,C["lib.es2019.object.d.ts"]=!0,C["lib.es2019.string.d.ts"]=!0,C["lib.es2019.symbol.d.ts"]=!0,C["lib.es2020.bigint.d.ts"]=!0,C["lib.es2020.d.ts"]=!0,C["lib.es2020.full.d.ts"]=!0,C["lib.es2020.intl.d.ts"]=!0,C["lib.es2020.promise.d.ts"]=!0,C["lib.es2020.sharedmemory.d.ts"]=!0,C["lib.es2020.string.d.ts"]=!0,C["lib.es2020.symbol.wellknown.d.ts"]=!0,C["lib.es2021.d.ts"]=!0,C["lib.es2021.full.d.ts"]=!0,C["lib.es2021.intl.d.ts"]=!0,C["lib.es2021.promise.d.ts"]=!0,C["lib.es2021.string.d.ts"]=!0,C["lib.es2021.weakref.d.ts"]=!0,C["lib.es5.d.ts"]=!0,C["lib.es6.d.ts"]=!0,C["lib.esnext.d.ts"]=!0,C["lib.esnext.full.d.ts"]=!0,C["lib.esnext.intl.d.ts"]=!0,C["lib.esnext.promise.d.ts"]=!0,C["lib.esnext.string.d.ts"]=!0,C["lib.esnext.weakref.d.ts"]=!0,C["lib.scripthost.d.ts"]=!0,C["lib.webworker.d.ts"]=!0,C["lib.webworker.importscripts.d.ts"]=!0,C["lib.webworker.iterable.d.ts"]=!0;var F=function(){function e(t){(0,p.Z)(this,e),this._worker=t}return(0,d.Z)(e,[{key:"_textSpanToRange",value:function(e,t){var r=e.getPositionAt(t.start),n=e.getPositionAt(t.start+t.length);return{startLineNumber:r.lineNumber,startColumn:r.column,endLineNumber:n.lineNumber,endColumn:n.column}}}]),e}(),I=function(){function e(t){(0,p.Z)(this,e),(0,g.Z)(this,"_libFiles",void 0),(0,g.Z)(this,"_hasFetchedLibFiles",void 0),(0,g.Z)(this,"_fetchLibFilesPromise",void 0),this._worker=t,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}return(0,d.Z)(e,[{key:"isLibFile",value:function(e){return!!e&&(0===e.path.indexOf("/lib.")&&!!C[e.path.slice(1)])}},{key:"getOrCreateModel",value:function(e){var t=w.Uri.parse(e),r=w.editor.getModel(t);if(r)return r;if(this.isLibFile(t)&&this._hasFetchedLibFiles)return w.editor.createModel(this._libFiles[t.path.slice(1)],"typescript",t);var n=h.TG.getExtraLibs()[e];return n?w.editor.createModel(n.content,"typescript",t):null}},{key:"_containsLibFile",value:function(e){var t,r=(0,b.Z)(e);try{for(r.s();!(t=r.n()).done;){var n=t.value;if(this.isLibFile(n))return!0}}catch(i){r.e(i)}finally{r.f()}return!1}},{key:"fetchLibFilesIfNecessary",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t){return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._containsLibFile(t)){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this._fetchLibFiles();case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_fetchLibFiles",value:function(){var e=this;return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then((function(e){return e.getLibFiles()})).then((function(t){e._hasFetchedLibFiles=!0,e._libFiles=t}))),this._fetchLibFilesPromise}}]),e}(),L=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(e,n,i,s){var a;(0,p.Z)(this,r),a=t.call(this,s),(0,g.Z)((0,o.Z)(a),"_disposables",[]),(0,g.Z)((0,o.Z)(a),"_listener",Object.create(null)),a._libFiles=e,a._defaults=n,a._selector=i;var u=function(e){if(e.getLanguageId()===i){var t,r=function(){a._defaults.getDiagnosticsOptions().onlyVisible?e.isAttachedToEditor()&&a._doValidate(e):a._doValidate(e)},n=e.onDidChangeContent((function(){clearTimeout(t),t=window.setTimeout(r,500)})),s=e.onDidChangeAttached((function(){a._defaults.getDiagnosticsOptions().onlyVisible&&(e.isAttachedToEditor()?r():w.editor.setModelMarkers(e,a._selector,[]))}));a._listener[e.uri.toString()]={dispose:function(){n.dispose(),s.dispose(),clearTimeout(t)}},r()}},c=function(e){w.editor.setModelMarkers(e,a._selector,[]);var t=e.uri.toString();a._listener[t]&&(a._listener[t].dispose(),delete a._listener[t])};a._disposables.push(w.editor.onDidCreateModel((function(e){return u(e)}))),a._disposables.push(w.editor.onWillDisposeModel(c)),a._disposables.push(w.editor.onDidChangeModelLanguage((function(e){c(e.model),u(e.model)}))),a._disposables.push({dispose:function(){var e,t=(0,b.Z)(w.editor.getModels());try{for(t.s();!(e=t.n()).done;){var r=e.value;c(r)}}catch(n){t.e(n)}finally{t.f()}}});var l=function(){var e,t=(0,b.Z)(w.editor.getModels());try{for(t.s();!(e=t.n()).done;){var r=e.value;c(r),u(r)}}catch(n){t.e(n)}finally{t.f()}};return a._disposables.push(a._defaults.onDidChange(l)),a._disposables.push(a._defaults.onDidExtraLibsChange(l)),w.editor.getModels().forEach((function(e){return u(e)})),a}return(0,d.Z)(r,[{key:"dispose",value:function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables=[]}},{key:"_doValidate",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t){var r,n,i,s,a,o,u,c,f,p=this;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._worker(t.uri);case 2:if(r=e.sent,!t.isDisposed()){e.next=5;break}return e.abrupt("return");case 5:return n=[],i=this._defaults.getDiagnosticsOptions(),s=i.noSyntaxValidation,a=i.noSemanticValidation,o=i.noSuggestionDiagnostics,s||n.push(r.getSyntacticDiagnostics(t.uri.toString())),a||n.push(r.getSemanticDiagnostics(t.uri.toString())),o||n.push(r.getSuggestionDiagnostics(t.uri.toString())),e.next=12,Promise.all(n);case 12:if((u=e.sent)&&!t.isDisposed()){e.next=15;break}return e.abrupt("return");case 15:return c=u.reduce((function(e,t){return t.concat(e)}),[]).filter((function(e){return-1===(p._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code)})),f=c.map((function(e){return e.relatedInformation||[]})).reduce((function(e,t){return t.concat(e)}),[]).map((function(e){return e.file?w.Uri.parse(e.file.fileName):null})),e.next=19,this._libFiles.fetchLibFilesIfNecessary(f);case 19:if(!t.isDisposed()){e.next=21;break}return e.abrupt("return");case 21:w.editor.setModelMarkers(t,this._selector,c.map((function(e){return p._convertDiagnostics(t,e)})));case 22:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_convertDiagnostics",value:function(e,t){var r=t.start||0,n=t.length||1,i=e.getPositionAt(r),s=i.lineNumber,a=i.column,o=e.getPositionAt(r+n),u=o.lineNumber,c=o.column,l=[];return t.reportsUnnecessary&&l.push(w.MarkerTag.Unnecessary),t.reportsDeprecated&&l.push(w.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:s,startColumn:a,endLineNumber:u,endColumn:c,message:A(t.messageText,"\n"),code:t.code.toString(),tags:l,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}}},{key:"_convertRelatedInformation",value:function(e,t){var r=this;if(!t)return[];var n=[];return t.forEach((function(t){var i=e;if(t.file&&(i=r._libFiles.getOrCreateModel(t.file.fileName)),i){var s=t.start||0,a=t.length||1,o=i.getPositionAt(s),u=o.lineNumber,c=o.column,l=i.getPositionAt(s+a),f=l.lineNumber,p=l.column;n.push({resource:i.uri,startLineNumber:u,startColumn:c,endLineNumber:f,endColumn:p,message:A(t.messageText,"\n")})}})),n}},{key:"_tsDiagnosticCategoryToMarkerSeverity",value:function(e){switch(e){case 1:return w.MarkerSeverity.Error;case 3:return w.MarkerSeverity.Info;case 0:return w.MarkerSeverity.Warning;case 2:return w.MarkerSeverity.Hint}return w.MarkerSeverity.Info}}]),r}(F),T=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"triggerCharacters",get:function(){return["."]}},{key:"provideCompletionItems",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,n,i,s){var a,o,u,c,f,p,d;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.getWordUntilPosition(n),o=new w.Range(n.lineNumber,a.startColumn,n.lineNumber,a.endColumn),u=t.uri,c=t.getOffsetAt(n),e.next=6,this._worker(u);case 6:if(f=e.sent,!t.isDisposed()){e.next=9;break}return e.abrupt("return");case 9:return e.next=11,f.getCompletionsAtPosition(u.toString(),c);case 11:if((p=e.sent)&&!t.isDisposed()){e.next=14;break}return e.abrupt("return");case 14:return d=p.entries.map((function(e){var i,s=o;if(e.replacementSpan){var a=t.getPositionAt(e.replacementSpan.start),l=t.getPositionAt(e.replacementSpan.start+e.replacementSpan.length);s=new w.Range(a.lineNumber,a.column,l.lineNumber,l.column)}var f=[];return-1!==(null===(i=e.kindModifiers)||void 0===i?void 0:i.indexOf("deprecated"))&&f.push(w.languages.CompletionItemTag.Deprecated),{uri:u,position:n,offset:c,range:s,label:e.name,insertText:e.name,sortText:e.sortText,kind:r.convertKind(e.kind),tags:f}})),e.abrupt("return",{suggestions:d});case 16:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()},{key:"resolveCompletionItem",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,n){var i,s,a,o,u,c;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=(i=t).uri,a=i.position,o=i.offset,e.next=6,this._worker(s);case 6:return u=e.sent,e.next=9,u.getCompletionEntryDetails(s.toString(),o,i.label);case 9:if(c=e.sent){e.next=12;break}return e.abrupt("return",i);case 12:return e.abrupt("return",{uri:s,position:a,label:c.name,kind:r.convertKind(c.kind),detail:D(c.displayParts),documentation:{value:r.createDocumentationString(c)}});case 13:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()}],[{key:"convertKind",value:function(e){switch(e){case H.primitiveType:case H.keyword:return w.languages.CompletionItemKind.Keyword;case H.variable:case H.localVariable:return w.languages.CompletionItemKind.Variable;case H.memberVariable:case H.memberGetAccessor:case H.memberSetAccessor:return w.languages.CompletionItemKind.Field;case H.function:case H.memberFunction:case H.constructSignature:case H.callSignature:case H.indexSignature:return w.languages.CompletionItemKind.Function;case H.enum:return w.languages.CompletionItemKind.Enum;case H.module:return w.languages.CompletionItemKind.Module;case H.class:return w.languages.CompletionItemKind.Class;case H.interface:return w.languages.CompletionItemKind.Interface;case H.warning:return w.languages.CompletionItemKind.File}return w.languages.CompletionItemKind.Property}},{key:"createDocumentationString",value:function(e){var t=D(e.documentation);if(e.tags){var r,n=(0,b.Z)(e.tags);try{for(n.s();!(r=n.n()).done;){var i=r.value;t+="\n\n".concat(P(i))}}catch(s){n.e(s)}finally{n.f()}}return t}}]),r}(F);function P(e){var t="*@".concat(e.name,"*");if("param"===e.name&&e.text){var r=(0,a.Z)(e.text),n=r[0],i=r.slice(1);t+="`".concat(n.text,"`"),i.length>0&&(t+=" \u2014 ".concat(i.map((function(e){return e.text})).join(" ")))}else Array.isArray(e.text)?t+=" \u2014 ".concat(e.text.map((function(e){return e.text})).join(" ")):e.text&&(t+=" \u2014 ".concat(e.text));return t}var O=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){var e;(0,p.Z)(this,r);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return e=t.call.apply(t,[this].concat(i)),(0,g.Z)((0,o.Z)(e),"signatureHelpTriggerCharacters",["(",","]),e}return(0,d.Z)(r,[{key:"provideSignatureHelp",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,n,i,s){var a,o,u,c,f;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,o=t.getOffsetAt(n),e.next=4,this._worker(a);case 4:if(u=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,u.getSignatureHelpItems(a.toString(),o,{triggerReason:r._toSignatureHelpTriggerReason(s)});case 9:if((c=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return f={activeSignature:c.selectedItemIndex,activeParameter:c.argumentIndex,signatures:[]},c.items.forEach((function(e){var t={label:"",parameters:[]};t.documentation={value:D(e.documentation)},t.label+=D(e.prefixDisplayParts),e.parameters.forEach((function(r,n,i){var s=D(r.displayParts),a={label:s,documentation:{value:D(r.documentation)}};t.label+=s,t.parameters.push(a),n<i.length-1&&(t.label+=D(e.separatorDisplayParts))})),t.label+=D(e.suffixDisplayParts),f.signatures.push(t)})),e.abrupt("return",{value:f,dispose:function(){}});case 15:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()}],[{key:"_toSignatureHelpTriggerReason",value:function(e){switch(e.triggerKind){case w.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case w.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case w.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}}}]),r}(F),N=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"provideHover",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n){var i,s,a,o,u,c,f;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,s=t.getOffsetAt(r),e.next=4,this._worker(i);case 4:if(a=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,a.getQuickInfoAtPosition(i.toString(),s);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return u=D(o.documentation),c=o.tags?o.tags.map((function(e){return P(e)})).join("  \n\n"):"",f=D(o.displayParts),e.abrupt("return",{range:this._textSpanToRange(t,o.textSpan),contents:[{value:"```typescript\n"+f+"\n```\n"},{value:u+(c?"\n\n"+c:"")}]});case 16:case"end":return e.stop()}}),e,this)})));return function(t,r,n){return e.apply(this,arguments)}}()}]),r}(F),K=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"provideDocumentHighlights",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n){var i,s,a,o,u=this;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,s=t.getOffsetAt(r),e.next=4,this._worker(i);case 4:if(a=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,a.getOccurrencesAtPosition(i.toString(),s);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.abrupt("return",o.map((function(e){return{range:u._textSpanToRange(t,e.textSpan),kind:e.isWriteAccess?w.languages.DocumentHighlightKind.Write:w.languages.DocumentHighlightKind.Text}})));case 13:case"end":return e.stop()}}),e,this)})));return function(t,r,n){return e.apply(this,arguments)}}()}]),r}(F),M=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(e,n){var i;return(0,p.Z)(this,r),(i=t.call(this,n))._libFiles=e,i}return(0,d.Z)(r,[{key:"provideDefinition",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n){var i,s,a,o,u,c,f,p,d;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,s=t.getOffsetAt(r),e.next=4,this._worker(i);case 4:if(a=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,a.getDefinitionAtPosition(i.toString(),s);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,this._libFiles.fetchLibFilesIfNecessary(o.map((function(e){return w.Uri.parse(e.fileName)})));case 14:if(!t.isDisposed()){e.next=16;break}return e.abrupt("return");case 16:u=[],c=(0,b.Z)(o);try{for(c.s();!(f=c.n()).done;)p=f.value,(d=this._libFiles.getOrCreateModel(p.fileName))&&u.push({uri:d.uri,range:this._textSpanToRange(d,p.textSpan)})}catch(n){c.e(n)}finally{c.f()}return e.abrupt("return",u);case 20:case"end":return e.stop()}}),e,this)})));return function(t,r,n){return e.apply(this,arguments)}}()}]),r}(F),R=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(e,n){var i;return(0,p.Z)(this,r),(i=t.call(this,n))._libFiles=e,i}return(0,d.Z)(r,[{key:"provideReferences",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n,i){var s,a,o,u,c,f,p,d,g;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=t.getOffsetAt(r),e.next=4,this._worker(s);case 4:if(o=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,o.getReferencesAtPosition(s.toString(),a);case 9:if((u=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,this._libFiles.fetchLibFilesIfNecessary(u.map((function(e){return w.Uri.parse(e.fileName)})));case 14:if(!t.isDisposed()){e.next=16;break}return e.abrupt("return");case 16:c=[],f=(0,b.Z)(u);try{for(f.s();!(p=f.n()).done;)d=p.value,(g=this._libFiles.getOrCreateModel(d.fileName))&&c.push({uri:g.uri,range:this._textSpanToRange(g,d.textSpan)})}catch(n){f.e(n)}finally{f.f()}return e.abrupt("return",c);case 20:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()}]),r}(F),E=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"provideDocumentSymbols",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r){var n,i,s,a,o,u=this;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.uri,e.next=3,this._worker(n);case 3:if(i=e.sent,!t.isDisposed()){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,i.getNavigationBarItems(n.toString());case 8:if((s=e.sent)&&!t.isDisposed()){e.next=11;break}return e.abrupt("return");case 11:return a=function e(r,n,i){var s={name:n.text,detail:"",kind:V[n.kind]||w.languages.SymbolKind.Variable,range:u._textSpanToRange(t,n.spans[0]),selectionRange:u._textSpanToRange(t,n.spans[0]),tags:[]};if(i&&(s.containerName=i),n.childItems&&n.childItems.length>0){var a,o=(0,b.Z)(n.childItems);try{for(o.s();!(a=o.n()).done;){e(r,a.value,s.name)}}catch(c){o.e(c)}finally{o.f()}}r.push(s)},o=[],s.forEach((function(e){return a(o,e)})),e.abrupt("return",o);case 15:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()}]),r}(F),H=(0,d.Z)((function e(){(0,p.Z)(this,e)}));Z(H,"unknown",""),Z(H,"keyword","keyword"),Z(H,"script","script"),Z(H,"module","module"),Z(H,"class","class"),Z(H,"interface","interface"),Z(H,"type","type"),Z(H,"enum","enum"),Z(H,"variable","var"),Z(H,"localVariable","local var"),Z(H,"function","function"),Z(H,"localFunction","local function"),Z(H,"memberFunction","method"),Z(H,"memberGetAccessor","getter"),Z(H,"memberSetAccessor","setter"),Z(H,"memberVariable","property"),Z(H,"constructorImplementation","constructor"),Z(H,"callSignature","call"),Z(H,"indexSignature","index"),Z(H,"constructSignature","construct"),Z(H,"parameter","parameter"),Z(H,"typeParameter","type parameter"),Z(H,"primitiveType","primitive type"),Z(H,"label","label"),Z(H,"alias","alias"),Z(H,"const","const"),Z(H,"let","let"),Z(H,"warning","warning");var V=Object.create(null);V[H.module]=w.languages.SymbolKind.Module,V[H.class]=w.languages.SymbolKind.Class,V[H.enum]=w.languages.SymbolKind.Enum,V[H.interface]=w.languages.SymbolKind.Interface,V[H.memberFunction]=w.languages.SymbolKind.Method,V[H.memberVariable]=w.languages.SymbolKind.Property,V[H.memberGetAccessor]=w.languages.SymbolKind.Property,V[H.memberSetAccessor]=w.languages.SymbolKind.Property,V[H.variable]=w.languages.SymbolKind.Variable,V[H.const]=w.languages.SymbolKind.Variable,V[H.localVariable]=w.languages.SymbolKind.Variable,V[H.variable]=w.languages.SymbolKind.Variable,V[H.function]=w.languages.SymbolKind.Function,V[H.localFunction]=w.languages.SymbolKind.Function;var W,j,B=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"_convertTextChanges",value:function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}}}],[{key:"_convertOptions",value:function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:2,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}}}]),r}(F),U=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"provideDocumentRangeFormattingEdits",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n,i){var s,a,o,u,c,f=this;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),o=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),e.next=5,this._worker(s);case 5:if(u=e.sent,!t.isDisposed()){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,u.getFormattingEditsForRange(s.toString(),a,o,B._convertOptions(n));case 10:if((c=e.sent)&&!t.isDisposed()){e.next=13;break}return e.abrupt("return");case 13:return e.abrupt("return",c.map((function(e){return f._convertTextChanges(t,e)})));case 14:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()}]),r}(B),z=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"autoFormatTriggerCharacters",get:function(){return[";","}","\n"]}},{key:"provideOnTypeFormattingEdits",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n,i,s){var a,o,u,c,f=this;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,o=t.getOffsetAt(r),e.next=4,this._worker(a);case 4:if(u=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,u.getFormattingEditsAfterKeystroke(a.toString(),o,n,B._convertOptions(i));case 9:if((c=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.abrupt("return",c.map((function(e){return f._convertTextChanges(t,e)})));case 13:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i,s){return e.apply(this,arguments)}}()}]),r}(B),G=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"provideCodeActions",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n,i){var s,a,o,u,c,f,p,d,g=this;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),o=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),u=B._convertOptions(t.getOptions()),c=n.markers.filter((function(e){return e.code})).map((function(e){return e.code})).map(Number),e.next=7,this._worker(s);case 7:if(f=e.sent,!t.isDisposed()){e.next=10;break}return e.abrupt("return");case 10:return e.next=12,f.getCodeFixesAtPosition(s.toString(),a,o,c,u);case 12:if((p=e.sent)&&!t.isDisposed()){e.next=15;break}return e.abrupt("return",{actions:[],dispose:function(){}});case 15:return d=p.filter((function(e){return 0===e.changes.filter((function(e){return e.isNewFile})).length})).map((function(e){return g._tsCodeFixActionToMonacoCodeAction(t,n,e)})),e.abrupt("return",{actions:d,dispose:function(){}});case 17:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()},{key:"_tsCodeFixActionToMonacoCodeAction",value:function(e,t,r){var n,i=[],s=(0,b.Z)(r.changes);try{for(s.s();!(n=s.n()).done;){var a,o=n.value,u=(0,b.Z)(o.textChanges);try{for(u.s();!(a=u.n()).done;){var c=a.value;i.push({resource:e.uri,versionId:void 0,textEdit:{range:this._textSpanToRange(e,c.span),text:c.newText}})}}catch(l){u.e(l)}finally{u.f()}}}catch(l){s.e(l)}finally{s.f()}return{title:r.description,edit:{edits:i},diagnostics:t.markers,kind:"quickfix"}}}]),r}(B),q=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(e,n){var i;return(0,p.Z)(this,r),(i=t.call(this,n))._libFiles=e,i}return(0,d.Z)(r,[{key:"provideRenameEdits",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n,i){var s,a,o,u,c,f,p,d,g,m,h;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=s.toString(),o=t.getOffsetAt(r),e.next=5,this._worker(s);case 5:if(u=e.sent,!t.isDisposed()){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,u.getRenameInfo(a,o,{allowRenameOfImportPath:!1});case 10:if(!1!==(c=e.sent).canRename){e.next=13;break}return e.abrupt("return",{edits:[],rejectReason:c.localizedErrorMessage});case 13:if(void 0===c.fileToRename){e.next=15;break}throw new Error("Renaming files is not supported.");case 15:return e.next=17,u.findRenameLocations(a,o,!1,!1,!1);case 17:if((f=e.sent)&&!t.isDisposed()){e.next=20;break}return e.abrupt("return");case 20:p=[],d=(0,b.Z)(f),e.prev=22,d.s();case 24:if((g=d.n()).done){e.next=34;break}if(m=g.value,!(h=this._libFiles.getOrCreateModel(m.fileName))){e.next=31;break}p.push({resource:h.uri,versionId:void 0,textEdit:{range:this._textSpanToRange(h,m.textSpan),text:n}}),e.next=32;break;case 31:throw new Error("Unknown file ".concat(m.fileName,"."));case 32:e.next=24;break;case 34:e.next=39;break;case 36:e.prev=36,e.t0=e.catch(22),d.e(e.t0);case 39:return e.prev=39,d.f(),e.finish(39);case 42:return e.abrupt("return",{edits:p});case 43:case"end":return e.stop()}}),e,this,[[22,36,39,42]])})));return function(t,r,n,i){return e.apply(this,arguments)}}()}]),r}(F),J=function(e){(0,u.Z)(r,e);var t=(0,c.Z)(r);function r(){return(0,p.Z)(this,r),t.apply(this,arguments)}return(0,d.Z)(r,[{key:"provideInlayHints",value:function(){var e=(0,f.Z)((0,l.Z)().mark((function e(t,r,n){var i,a,o,u,c,f,p,d=this;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,a=i.toString(),o=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),u=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),e.next=6,this._worker(i);case 6:if(c=e.sent,!t.isDisposed()){e.next=9;break}return e.abrupt("return",null);case 9:return e.next=11,c.provideInlayHints(a,o,u);case 11:return f=e.sent,p=f.map((function(e){return(0,s.Z)((0,s.Z)({},e),{},{label:e.text,position:t.getPositionAt(e.position),kind:d._convertHintKind(e.kind)})})),e.abrupt("return",{hints:p,dispose:function(){}});case 14:case"end":return e.stop()}}),e,this)})));return function(t,r,n){return e.apply(this,arguments)}}()},{key:"_convertHintKind",value:function(e){return"Parameter"===e?w.languages.InlayHintKind.Parameter:w.languages.InlayHintKind.Type}}]),r}(F);function Q(e){j=ee(e,"typescript")}function X(e){W=ee(e,"javascript")}function Y(){return new Promise((function(e,t){if(!W)return t("JavaScript not registered!");e(W)}))}function $(){return new Promise((function(e,t){if(!j)return t("TypeScript not registered!");e(j)}))}function ee(e,t){var r=new S(t,e),n=function(){return r.getLanguageServiceWorker.apply(r,arguments)},i=new I(n);return w.languages.registerCompletionItemProvider(t,new T(n)),w.languages.registerSignatureHelpProvider(t,new O(n)),w.languages.registerHoverProvider(t,new N(n)),w.languages.registerDocumentHighlightProvider(t,new K(n)),w.languages.registerDefinitionProvider(t,new M(i,n)),w.languages.registerReferenceProvider(t,new R(i,n)),w.languages.registerDocumentSymbolProvider(t,new E(n)),w.languages.registerDocumentRangeFormattingEditProvider(t,new U(n)),w.languages.registerOnTypeFormattingEditProvider(t,new z(n)),w.languages.registerCodeActionProvider(t,new G(n)),w.languages.registerRenameProvider(t,new q(i,n)),w.languages.registerInlayHintsProvider(t,new J(n)),new L(i,e,t,n),n}}}]);
//# sourceMappingURL=1258.5645727f.chunk.js.map