/**
 * Copyright (c) 2010-2015, Michael Bostock
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * The name Michael Bostock may not be used to endorse or promote products
 *   derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(e,t){typeof define=="function"&&define.amd?define(["exports","echarts"],t):typeof exports=="object"&&typeof exports.nodeName!="string"?t(exports,require("echarts")):t({},e.echarts)})(this,function(e,t){var n,r;(function(){function t(e,t){if(!t)return e;if(e.indexOf(".")===0){var n=t.split("/"),r=e.split("/"),i=n.length-1,s=r.length,o=0,u=0;e:for(var a=0;a<s;a++)switch(r[a]){case"..":if(!(o<i))break e;o++,u++;break;case".":u++;break;default:break e}return n.length=i-o,r=r.slice(u),n.concat(r).join("/")}return e}function i(e){function r(r,i){if(typeof r=="string"){var u=n[r];return u||(u=o(t(r,e)),n[r]=u),u}r instanceof Array&&(i=i||function(){},i.apply(this,s(r,i,e)))}var n={};return r}function s(r,i,s){var u=[],a=e[s];for(var f=0,l=Math.min(r.length,i.length);f<l;f++){var c=t(r[f],s),h;switch(c){case"require":h=a&&a.require||n;break;case"exports":h=a.exports;break;case"module":h=a;break;default:h=o(c)}u.push(h)}return u}function o(t){var n=e[t];if(!n)throw new Error("No "+t);if(!n.defined){var r=n.factory,i=r.apply(this,s(n.deps||[],r,t));typeof i!="undefined"&&(n.exports=i),n.defined=1}return n.exports}var e={};r=function(t,n,r){if(arguments.length===2){r=n,n=[];if(typeof r!="function"){var s=r;r=function(){return s}}}e[t]={id:t,deps:n,factory:r,defined:0,exports:{},require:i(t)}},n=i("")})(),r("echarts",[],function(){return t}),r("extension/statistics/quantile",["require"],function(e){return function(e,t){var n=(e.length-1)*t+1,r=Math.floor(n),i=+e[r-1],s=n-r;return s?i+s*(e[r]-i):i}}),r("extension/statistics/prepareBoxplotData",["require","./quantile","echarts"],function(e){var t=e("./quantile"),n=e("echarts").number;return function(e,r){r=r||[];var i=[],s=[],o=[],u=r.boundIQR;for(var a=0;a<e.length;a++){o.push(a+"");var f=n.asc(e[a].slice()),l=t(f,.25),c=t(f,.5),h=t(f,.75),p=h-l,d=u==="none"?f[0]:l-(u==null?1.5:u)*p,v=u==="none"?f[f.length-1]:h+(u==null?1.5:u)*p;i.push([d,l,c,h,v]);for(var m=0;m<f.length;m++){var g=f[m];(g<d||g>v)&&s.push([a,g])}}return{boxData:i,outliers:s,axisData:o}}}),e.statistics=t.statistics={quantile:n("extension/statistics/quantile"),prepareBoxplotData:n("extension/statistics/prepareBoxplotData")}});