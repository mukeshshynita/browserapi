(function (g, f) {
  if ("object" == typeof exports && "object" == typeof module) {
    module.exports = f();
  } else if ("function" == typeof define && define.amd) {
    define("rrweb", [], f);
  } else if ("object" == typeof exports) {
    exports["rrweb"] = f();
  } else {
    g["rrweb"] = f();
  }
})(this, () => {
  var exports = {};
  var module = { exports };
  ("use strict");
  var To = Object.defineProperty,
    _o = Object.defineProperties;
  var Fo = Object.getOwnPropertyDescriptors;
  var ht = Object.getOwnPropertySymbols;
  var Bs = Object.prototype.hasOwnProperty,
    Ws = Object.prototype.propertyIsEnumerable;
  var Us = (s, e, t) => (e in s ? To(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t)),
    x = (s, e) => {
      for (var t in e || (e = {})) Bs.call(e, t) && Us(s, t, e[t]);
      if (ht) for (var t of ht(e)) Ws.call(e, t) && Us(s, t, e[t]);
      return s;
    },
    q = (s, e) => _o(s, Fo(e));
  var xe = (s, e) => {
    var t = {};
    for (var r in s) Bs.call(s, r) && e.indexOf(r) < 0 && (t[r] = s[r]);
    if (s != null && ht) for (var r of ht(s)) e.indexOf(r) < 0 && Ws.call(s, r) && (t[r] = s[r]);
    return t;
  };
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  var Uo = Object.defineProperty,
    Bo = (s, e, t) => (e in s ? Uo(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t)),
    w = (s, e, t) => Bo(s, typeof e != "symbol" ? e + "" : e, t),
    zs,
    Wo = Object.defineProperty,
    zo = (s, e, t) => (e in s ? Wo(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t)),
    Gs = (s, e, t) => zo(s, typeof e != "symbol" ? e + "" : e, t),
    G = ((s) => (
      (s[(s.Document = 0)] = "Document"),
      (s[(s.DocumentType = 1)] = "DocumentType"),
      (s[(s.Element = 2)] = "Element"),
      (s[(s.Text = 3)] = "Text"),
      (s[(s.CDATA = 4)] = "CDATA"),
      (s[(s.Comment = 5)] = "Comment"),
      s
    ))(G || {});
  const Vs = {
      Node: ["childNodes", "parentNode", "parentElement", "textContent"],
      ShadowRoot: ["host", "styleSheets"],
      Element: ["shadowRoot", "querySelector", "querySelectorAll"],
      MutationObserver: [],
    },
    js = {
      Node: ["contains", "getRootNode"],
      ShadowRoot: ["getSelection"],
      Element: [],
      MutationObserver: ["constructor"],
    },
    ft = {};
  function us(s) {
    if (ft[s]) return ft[s];
    const e = globalThis[s],
      t = e.prototype,
      r = s in Vs ? Vs[s] : void 0,
      i = !!(
        r &&
        r.every((l) => {
          var a, u;
          return !!(
            (u = (a = Object.getOwnPropertyDescriptor(t, l)) == null ? void 0 : a.get) != null &&
            u.toString().includes("[native code]")
          );
        })
      ),
      n = s in js ? js[s] : void 0,
      o = !!(
        n &&
        n.every((l) => {
          var a;
          return typeof t[l] == "function" && ((a = t[l]) == null ? void 0 : a.toString().includes("[native code]"));
        })
      );
    if (i && o) return (ft[s] = e.prototype), e.prototype;
    try {
      const l = document.createElement("iframe");
      document.body.appendChild(l);
      const a = l.contentWindow;
      if (!a) return e.prototype;
      const u = a[s].prototype;
      return document.body.removeChild(l), u ? (ft[s] = u) : t;
    } catch (l) {
      return t;
    }
  }
  const gr = {};
  function me(s, e, t) {
    var r;
    const i = `${s}.${String(t)}`;
    if (gr[i]) return gr[i].call(e);
    const n = us(s),
      o = (r = Object.getOwnPropertyDescriptor(n, t)) == null ? void 0 : r.get;
    return o ? ((gr[i] = o), o.call(e)) : e[t];
  }
  const yr = {};
  function Wi(s, e, t) {
    const r = `${s}.${String(t)}`;
    if (yr[r]) return yr[r].bind(e);
    const n = us(s)[t];
    return typeof n != "function" ? e[t] : ((yr[r] = n), n.bind(e));
  }
  function Go(s) {
    return me("Node", s, "childNodes");
  }
  function Vo(s) {
    return me("Node", s, "parentNode");
  }
  function jo(s) {
    return me("Node", s, "parentElement");
  }
  function Ho(s) {
    return me("Node", s, "textContent");
  }
  function Yo(s, e) {
    return Wi("Node", s, "contains")(e);
  }
  function Zo(s) {
    return Wi("Node", s, "getRootNode")();
  }
  function Jo(s) {
    return !s || !("host" in s) ? null : me("ShadowRoot", s, "host");
  }
  function Xo(s) {
    return s.styleSheets;
  }
  function Ko(s) {
    return !s || !("shadowRoot" in s) ? null : me("Element", s, "shadowRoot");
  }
  function Qo(s, e) {
    return me("Element", s, "querySelector")(e);
  }
  function qo(s, e) {
    return me("Element", s, "querySelectorAll")(e);
  }
  function ea() {
    return us("MutationObserver").constructor;
  }
  const Y = {
    childNodes: Go,
    parentNode: Vo,
    parentElement: jo,
    textContent: Ho,
    contains: Yo,
    getRootNode: Zo,
    host: Jo,
    styleSheets: Xo,
    shadowRoot: Ko,
    querySelector: Qo,
    querySelectorAll: qo,
    mutationObserver: ea,
  };
  function zi(s) {
    return s.nodeType === s.ELEMENT_NODE;
  }
  function Ve(s) {
    const e = (s && "host" in s && "mode" in s && Y.host(s)) || null;
    return !!(e && "shadowRoot" in e && Y.shadowRoot(e) === s);
  }
  function je(s) {
    return Object.prototype.toString.call(s) === "[object ShadowRoot]";
  }
  function ta(s) {
    return (
      s.includes(" background-clip: text;") &&
        !s.includes(" -webkit-background-clip: text;") &&
        (s = s.replace(/\sbackground-clip:\s*text;/g, " -webkit-background-clip: text; background-clip: text;")),
      s
    );
  }
  function ra(s) {
    const { cssText: e } = s;
    if (e.split('"').length < 3) return e;
    const t = ["@import", `url(${JSON.stringify(s.href)})`];
    return (
      s.layerName === "" ? t.push("layer") : s.layerName && t.push(`layer(${s.layerName})`),
      s.supportsText && t.push(`supports(${s.supportsText})`),
      s.media.length && t.push(s.media.mediaText),
      t.join(" ") + ";"
    );
  }
  function Wt(s) {
    try {
      const e = s.rules || s.cssRules;
      if (!e) return null;
      const t = Array.from(e, (r) => Gi(r, s.href)).join("");
      return ta(t);
    } catch (e) {
      return null;
    }
  }
  function Gi(s, e) {
    if (ia(s)) {
      let t;
      try {
        t = Wt(s.styleSheet) || ra(s);
      } catch (r) {
        t = s.cssText;
      }
      return s.styleSheet.href ? zt(t, s.styleSheet.href) : t;
    } else {
      let t = s.cssText;
      return na(s) && s.selectorText.includes(":") && (t = sa(t)), e ? zt(t, e) : t;
    }
  }
  function sa(s) {
    const e = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
    return s.replace(e, "$1\\$2");
  }
  function ia(s) {
    return "styleSheet" in s;
  }
  function na(s) {
    return "selectorText" in s;
  }
  class Vi {
    constructor() {
      Gs(this, "idNodeMap", new Map()), Gs(this, "nodeMetaMap", new WeakMap());
    }
    getId(e) {
      var t;
      if (!e) return -1;
      const r = (t = this.getMeta(e)) == null ? void 0 : t.id;
      return r != null ? r : -1;
    }
    getNode(e) {
      return this.idNodeMap.get(e) || null;
    }
    getIds() {
      return Array.from(this.idNodeMap.keys());
    }
    getMeta(e) {
      return this.nodeMetaMap.get(e) || null;
    }
    removeNodeFromMap(e) {
      const t = this.getId(e);
      this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach((r) => this.removeNodeFromMap(r));
    }
    has(e) {
      return this.idNodeMap.has(e);
    }
    hasNode(e) {
      return this.nodeMetaMap.has(e);
    }
    add(e, t) {
      const r = t.id;
      this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, t);
    }
    replace(e, t) {
      const r = this.getNode(e);
      if (r) {
        const i = this.nodeMetaMap.get(r);
        i && this.nodeMetaMap.set(t, i);
      }
      this.idNodeMap.set(e, t);
    }
    reset() {
      (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
    }
  }
  function oa() {
    return new Vi();
  }
  function cs({ element: s, maskInputOptions: e, tagName: t, type: r, value: i, maskInputFn: n }) {
    let o = i || "";
    const l = r && Ce(r);
    return (e[t.toLowerCase()] || (l && e[l])) && (n ? (o = n(o, s)) : (o = "*".repeat(o.length))), o;
  }
  function Ce(s) {
    return s.toLowerCase();
  }
  const Hs = "__rrweb_original__";
  function aa(s) {
    const e = s.getContext("2d");
    if (!e) return !0;
    const t = 50;
    for (let r = 0; r < s.width; r += t)
      for (let i = 0; i < s.height; i += t) {
        const n = e.getImageData,
          o = Hs in n ? n[Hs] : n;
        if (
          new Uint32Array(o.call(e, r, i, Math.min(t, s.width - r), Math.min(t, s.height - i)).data.buffer).some(
            (a) => a !== 0,
          )
        )
          return !1;
      }
    return !0;
  }
  function hs(s) {
    const e = s.type;
    return s.hasAttribute("data-rr-is-password") ? "password" : e ? Ce(e) : null;
  }
  function ji(s, e) {
    var n;
    let t;
    try {
      t = new URL(s, e != null ? e : window.location.href);
    } catch (o) {
      return null;
    }
    const r = /\.([0-9a-z]+)(?:$)/i,
      i = t.pathname.match(r);
    return (n = i == null ? void 0 : i[1]) != null ? n : null;
  }
  function la(s) {
    let e = "";
    return (
      s.indexOf("//") > -1 ? (e = s.split("/").slice(0, 3).join("/")) : (e = s.split("/")[0]), (e = e.split("?")[0]), e
    );
  }
  const ua = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
    ca = /^(?:[a-z+]+:)?\/\//i,
    ha = /^www\..*/i,
    fa = /^(data:)([^,]*),(.*)/i;
  function zt(s, e) {
    return (s || "").replace(ua, (t, r, i, n, o, l) => {
      const a = i || o || l,
        u = r || n || "";
      if (!a) return t;
      if (ca.test(a) || ha.test(a)) return `url(${u}${a}${u})`;
      if (fa.test(a)) return `url(${u}${a}${u})`;
      if (a[0] === "/") return `url(${u}${la(e) + a}${u})`;
      const c = e.split("/"),
        h = a.split("/");
      c.pop();
      for (const m of h) m !== "." && (m === ".." ? c.pop() : c.push(m));
      return `url(${u}${c.join("/")}${u})`;
    });
  }
  let pa = 1;
  const da = new RegExp("[^a-z0-9-_:]"),
    Ye = -2;
  function Hi() {
    return pa++;
  }
  function ma(s) {
    if (s instanceof HTMLFormElement) return "form";
    const e = Ce(s.tagName);
    return da.test(e) ? "div" : e;
  }
  let Oe, Ys;
  const ga = /^[^ \t\n\r\u000c]+/,
    ya = /^[, \t\n\r\u000c]+/;
  function wa(s, e) {
    if (e.trim() === "") return e;
    let t = 0;
    function r(n) {
      let o;
      const l = n.exec(e.substring(t));
      return l ? ((o = l[0]), (t += o.length), o) : "";
    }
    const i = [];
    for (; r(ya), !(t >= e.length); ) {
      let n = r(ga);
      if (n.slice(-1) === ",") (n = Ae(s, n.substring(0, n.length - 1))), i.push(n);
      else {
        let o = "";
        n = Ae(s, n);
        let l = !1;
        for (;;) {
          const a = e.charAt(t);
          if (a === "") {
            i.push((n + o).trim());
            break;
          } else if (l) a === ")" && (l = !1);
          else if (a === ",") {
            (t += 1), i.push((n + o).trim());
            break;
          } else a === "(" && (l = !0);
          (o += a), (t += 1);
        }
      }
    }
    return i.join(", ");
  }
  const Zs = new WeakMap();
  function Ae(s, e) {
    return !e || e.trim() === "" ? e : fs(s, e);
  }
  function Sa(s) {
    return !!(s.tagName === "svg" || s.ownerSVGElement);
  }
  function fs(s, e) {
    let t = Zs.get(s);
    if ((t || ((t = s.createElement("a")), Zs.set(s, t)), !e)) e = "";
    else if (e.startsWith("blob:") || e.startsWith("data:")) return e;
    return t.setAttribute("href", e), t.href;
  }
  function Yi(s, e, t, r) {
    return (
      r &&
      (t === "src" ||
      (t === "href" && !(e === "use" && r[0] === "#")) ||
      (t === "xlink:href" && r[0] !== "#") ||
      (t === "background" && (e === "table" || e === "td" || e === "th"))
        ? Ae(s, r)
        : t === "srcset"
          ? wa(s, r)
          : t === "style"
            ? zt(r, fs(s))
            : e === "object" && t === "data"
              ? Ae(s, r)
              : r)
    );
  }
  function Zi(s, e, t) {
    return (s === "video" || s === "audio") && e === "autoplay";
  }
  function ba(s, e, t) {
    try {
      if (typeof e == "string") {
        if (s.classList.contains(e)) return !0;
      } else
        for (let r = s.classList.length; r--; ) {
          const i = s.classList[r];
          if (e.test(i)) return !0;
        }
      if (t) return s.matches(t);
    } catch (r) {}
    return !1;
  }
  function Gt(s, e, t) {
    if (!s) return !1;
    if (s.nodeType !== s.ELEMENT_NODE) return t ? Gt(Y.parentNode(s), e, t) : !1;
    for (let r = s.classList.length; r--; ) {
      const i = s.classList[r];
      if (e.test(i)) return !0;
    }
    return t ? Gt(Y.parentNode(s), e, t) : !1;
  }
  function Ji(s, e, t, r) {
    let i;
    if (zi(s)) {
      if (((i = s), !Y.childNodes(i).length)) return !1;
    } else {
      if (Y.parentElement(s) === null) return !1;
      i = Y.parentElement(s);
    }
    try {
      if (typeof e == "string") {
        if (r) {
          if (i.closest(`.${e}`)) return !0;
        } else if (i.classList.contains(e)) return !0;
      } else if (Gt(i, e, r)) return !0;
      if (t) {
        if (r) {
          if (i.closest(t)) return !0;
        } else if (i.matches(t)) return !0;
      }
    } catch (n) {}
    return !1;
  }
  function Ca(s, e, t) {
    const r = s.contentWindow;
    if (!r) return;
    let i = !1,
      n;
    try {
      n = r.document.readyState;
    } catch (l) {
      return;
    }
    if (n !== "complete") {
      const l = setTimeout(() => {
        i || (e(), (i = !0));
      }, t);
      s.addEventListener("load", () => {
        clearTimeout(l), (i = !0), e();
      });
      return;
    }
    const o = "about:blank";
    if (r.location.href !== o || s.src === o || s.src === "") return setTimeout(e, 0), s.addEventListener("load", e);
    s.addEventListener("load", e);
  }
  function va(s, e, t) {
    let r = !1,
      i;
    try {
      i = s.sheet;
    } catch (o) {
      return;
    }
    if (i) return;
    const n = setTimeout(() => {
      r || (e(), (r = !0));
    }, t);
    s.addEventListener("load", () => {
      clearTimeout(n), (r = !0), e();
    });
  }
  function Ia(s, e) {
    const {
        doc: t,
        mirror: r,
        blockClass: i,
        blockSelector: n,
        needsMask: o,
        inlineStylesheet: l,
        maskInputOptions: a = {},
        maskTextFn: u,
        maskInputFn: c,
        dataURLOptions: h = {},
        inlineImages: m,
        recordCanvas: d,
        keepIframeSrcFn: g,
        newlyAddedElement: p = !1,
      } = e,
      f = xa(t, r);
    switch (s.nodeType) {
      case s.DOCUMENT_NODE:
        return s.compatMode !== "CSS1Compat"
          ? { type: G.Document, childNodes: [], compatMode: s.compatMode }
          : { type: G.Document, childNodes: [] };
      case s.DOCUMENT_TYPE_NODE:
        return { type: G.DocumentType, name: s.name, publicId: s.publicId, systemId: s.systemId, rootId: f };
      case s.ELEMENT_NODE:
        return Ra(s, {
          doc: t,
          blockClass: i,
          blockSelector: n,
          inlineStylesheet: l,
          maskInputOptions: a,
          maskInputFn: c,
          dataURLOptions: h,
          inlineImages: m,
          recordCanvas: d,
          keepIframeSrcFn: g,
          newlyAddedElement: p,
          rootId: f,
        });
      case s.TEXT_NODE:
        return Oa(s, { doc: t, needsMask: o, maskTextFn: u, rootId: f });
      case s.CDATA_SECTION_NODE:
        return { type: G.CDATA, textContent: "", rootId: f };
      case s.COMMENT_NODE:
        return { type: G.Comment, textContent: Y.textContent(s) || "", rootId: f };
      default:
        return !1;
    }
  }
  function xa(s, e) {
    if (!e.hasNode(s)) return;
    const t = e.getId(s);
    return t === 1 ? void 0 : t;
  }
  function Oa(s, e) {
    var t;
    const { needsMask: r, maskTextFn: i, rootId: n } = e,
      o = Y.parentNode(s),
      l = o && o.tagName;
    let a = Y.textContent(s);
    const u = l === "STYLE" ? !0 : void 0,
      c = l === "SCRIPT" ? !0 : void 0;
    if (u && a) {
      try {
        s.nextSibling || s.previousSibling || ((t = o.sheet) != null && t.cssRules && (a = Wt(o.sheet)));
      } catch (h) {
        console.warn(`Cannot get CSS styles from text's parentNode. Error: ${h}`, s);
      }
      a = zt(a, fs(e.doc));
    }
    return (
      c && (a = "SCRIPT_PLACEHOLDER"),
      !u && !c && a && r && (a = i ? i(a, Y.parentElement(s)) : a.replace(/[\S]/g, "*")),
      { type: G.Text, textContent: a || "", isStyle: u, rootId: n }
    );
  }
  function Ra(s, e) {
    const {
        doc: t,
        blockClass: r,
        blockSelector: i,
        inlineStylesheet: n,
        maskInputOptions: o = {},
        maskInputFn: l,
        dataURLOptions: a = {},
        inlineImages: u,
        recordCanvas: c,
        keepIframeSrcFn: h,
        newlyAddedElement: m = !1,
        rootId: d,
      } = e,
      g = ba(s, r, i),
      p = ma(s);
    let f = {};
    const b = s.attributes.length;
    for (let y = 0; y < b; y++) {
      const C = s.attributes[y];
      Zi(p, C.name, C.value) || (f[C.name] = Yi(t, p, Ce(C.name), C.value));
    }
    if (p === "link" && n) {
      const y = Array.from(t.styleSheets).find((k) => k.href === s.href);
      let C = null;
      y && (C = Wt(y)), C && (delete f.rel, delete f.href, (f._cssText = C));
    }
    if (p === "style" && s.sheet && !(s.innerText || Y.textContent(s) || "").trim().length) {
      const y = Wt(s.sheet);
      y && (f._cssText = y);
    }
    if (p === "input" || p === "textarea" || p === "select") {
      const y = s.value,
        C = s.checked;
      f.type !== "radio" && f.type !== "checkbox" && f.type !== "submit" && f.type !== "button" && y
        ? (f.value = cs({ element: s, type: hs(s), tagName: p, value: y, maskInputOptions: o, maskInputFn: l }))
        : C && (f.checked = C);
    }
    if (
      (p === "option" && (s.selected && !o.select ? (f.selected = !0) : delete f.selected),
      p === "dialog" && s.open && (f.rr_open_mode = s.matches("dialog:modal") ? "modal" : "non-modal"),
      p === "canvas" && c)
    ) {
      if (s.__context === "2d") aa(s) || (f.rr_dataURL = s.toDataURL(a.type, a.quality));
      else if (!("__context" in s)) {
        const y = s.toDataURL(a.type, a.quality),
          C = t.createElement("canvas");
        (C.width = s.width), (C.height = s.height);
        const k = C.toDataURL(a.type, a.quality);
        y !== k && (f.rr_dataURL = y);
      }
    }
    if (p === "img" && u) {
      Oe || ((Oe = t.createElement("canvas")), (Ys = Oe.getContext("2d")));
      const y = s,
        C = y.currentSrc || y.getAttribute("src") || "<unknown-src>",
        k = y.crossOrigin,
        L = () => {
          y.removeEventListener("load", L);
          try {
            (Oe.width = y.naturalWidth),
              (Oe.height = y.naturalHeight),
              Ys.drawImage(y, 0, 0),
              (f.rr_dataURL = Oe.toDataURL(a.type, a.quality));
          } catch (V) {
            if (y.crossOrigin !== "anonymous") {
              (y.crossOrigin = "anonymous"), y.complete && y.naturalWidth !== 0 ? L() : y.addEventListener("load", L);
              return;
            } else console.warn(`Cannot inline img src=${C}! Error: ${V}`);
          }
          y.crossOrigin === "anonymous" && (k ? (f.crossOrigin = k) : y.removeAttribute("crossorigin"));
        };
      y.complete && y.naturalWidth !== 0 ? L() : y.addEventListener("load", L);
    }
    if (p === "audio" || p === "video") {
      const y = f;
      (y.rr_mediaState = s.paused ? "paused" : "played"),
        (y.rr_mediaCurrentTime = s.currentTime),
        (y.rr_mediaPlaybackRate = s.playbackRate),
        (y.rr_mediaMuted = s.muted),
        (y.rr_mediaLoop = s.loop),
        (y.rr_mediaVolume = s.volume);
    }
    if ((m || (s.scrollLeft && (f.rr_scrollLeft = s.scrollLeft), s.scrollTop && (f.rr_scrollTop = s.scrollTop)), g)) {
      const { width: y, height: C } = s.getBoundingClientRect();
      f = { class: f.class, rr_width: `${y}px`, rr_height: `${C}px` };
    }
    p === "iframe" && !h(f.src) && (s.contentDocument || (f.rr_src = f.src), delete f.src);
    let S;
    try {
      customElements.get(p) && (S = !0);
    } catch (y) {}
    return {
      type: G.Element,
      tagName: p,
      attributes: f,
      childNodes: [],
      isSVG: Sa(s) || void 0,
      needBlock: g,
      rootId: d,
      isCustom: S,
    };
  }
  function D(s) {
    return s == null ? "" : s.toLowerCase();
  }
  function Ma(s, e) {
    if (e.comment && s.type === G.Comment) return !0;
    if (s.type === G.Element) {
      if (
        e.script &&
        (s.tagName === "script" ||
          (s.tagName === "link" &&
            (s.attributes.rel === "preload" || s.attributes.rel === "modulepreload") &&
            s.attributes.as === "script") ||
          (s.tagName === "link" &&
            s.attributes.rel === "prefetch" &&
            typeof s.attributes.href == "string" &&
            ji(s.attributes.href) === "js"))
      )
        return !0;
      if (
        e.headFavicon &&
        ((s.tagName === "link" && s.attributes.rel === "shortcut icon") ||
          (s.tagName === "meta" &&
            (D(s.attributes.name).match(/^msapplication-tile(image|color)$/) ||
              D(s.attributes.name) === "application-name" ||
              D(s.attributes.rel) === "icon" ||
              D(s.attributes.rel) === "apple-touch-icon" ||
              D(s.attributes.rel) === "shortcut icon")))
      )
        return !0;
      if (s.tagName === "meta") {
        if (e.headMetaDescKeywords && D(s.attributes.name).match(/^description|keywords$/)) return !0;
        if (
          e.headMetaSocial &&
          (D(s.attributes.property).match(/^(og|twitter|fb):/) ||
            D(s.attributes.name).match(/^(og|twitter):/) ||
            D(s.attributes.name) === "pinterest")
        )
          return !0;
        if (
          e.headMetaRobots &&
          (D(s.attributes.name) === "robots" ||
            D(s.attributes.name) === "googlebot" ||
            D(s.attributes.name) === "bingbot")
        )
          return !0;
        if (e.headMetaHttpEquiv && s.attributes["http-equiv"] !== void 0) return !0;
        if (
          e.headMetaAuthorship &&
          (D(s.attributes.name) === "author" ||
            D(s.attributes.name) === "generator" ||
            D(s.attributes.name) === "framework" ||
            D(s.attributes.name) === "publisher" ||
            D(s.attributes.name) === "progid" ||
            D(s.attributes.property).match(/^article:/) ||
            D(s.attributes.property).match(/^product:/))
        )
          return !0;
        if (
          e.headMetaVerification &&
          (D(s.attributes.name) === "google-site-verification" ||
            D(s.attributes.name) === "yandex-verification" ||
            D(s.attributes.name) === "csrf-token" ||
            D(s.attributes.name) === "p:domain_verify" ||
            D(s.attributes.name) === "verify-v1" ||
            D(s.attributes.name) === "verification" ||
            D(s.attributes.name) === "shopify-checkout-api-token")
        )
          return !0;
      }
    }
    return !1;
  }
  function Ee(s, e) {
    const {
      doc: t,
      mirror: r,
      blockClass: i,
      blockSelector: n,
      maskTextClass: o,
      maskTextSelector: l,
      skipChild: a = !1,
      inlineStylesheet: u = !0,
      maskInputOptions: c = {},
      maskTextFn: h,
      maskInputFn: m,
      slimDOMOptions: d,
      dataURLOptions: g = {},
      inlineImages: p = !1,
      recordCanvas: f = !1,
      onSerialize: b,
      onIframeLoad: S,
      iframeLoadTimeout: y = 5e3,
      onStylesheetLoad: C,
      stylesheetLoadTimeout: k = 5e3,
      keepIframeSrcFn: L = () => !1,
      newlyAddedElement: V = !1,
    } = e;
    let { needsMask: M } = e,
      { preserveWhiteSpace: j = !0 } = e;
    M || (M = Ji(s, o, l, M === void 0));
    const H = Ia(s, {
      doc: t,
      mirror: r,
      blockClass: i,
      blockSelector: n,
      needsMask: M,
      inlineStylesheet: u,
      maskInputOptions: c,
      maskTextFn: h,
      maskInputFn: m,
      dataURLOptions: g,
      inlineImages: p,
      recordCanvas: f,
      keepIframeSrcFn: L,
      newlyAddedElement: V,
    });
    if (!H) return console.warn(s, "not serialized"), null;
    let Q;
    r.hasNode(s)
      ? (Q = r.getId(s))
      : Ma(H, d) || (!j && H.type === G.Text && !H.isStyle && !H.textContent.replace(/^\s+|\s+$/gm, "").length)
        ? (Q = Ye)
        : (Q = Hi());
    const A = Object.assign(H, { id: Q });
    if ((r.add(s, A), Q === Ye)) return null;
    b && b(s);
    let ye = !a;
    if (A.type === G.Element) {
      (ye = ye && !A.needBlock), delete A.needBlock;
      const Z = Y.shadowRoot(s);
      Z && je(Z) && (A.isShadowHost = !0);
    }
    if ((A.type === G.Document || A.type === G.Element) && ye) {
      d.headWhitespace && A.type === G.Element && A.tagName === "head" && (j = !1);
      const Z = {
        doc: t,
        mirror: r,
        blockClass: i,
        blockSelector: n,
        needsMask: M,
        maskTextClass: o,
        maskTextSelector: l,
        skipChild: a,
        inlineStylesheet: u,
        maskInputOptions: c,
        maskTextFn: h,
        maskInputFn: m,
        slimDOMOptions: d,
        dataURLOptions: g,
        inlineImages: p,
        recordCanvas: f,
        preserveWhiteSpace: j,
        onSerialize: b,
        onIframeLoad: S,
        iframeLoadTimeout: y,
        onStylesheetLoad: C,
        stylesheetLoadTimeout: k,
        keepIframeSrcFn: L,
      };
      if (!(A.type === G.Element && A.tagName === "textarea" && A.attributes.value !== void 0))
        for (const ce of Array.from(Y.childNodes(s))) {
          const oe = Ee(ce, Z);
          oe && A.childNodes.push(oe);
        }
      let te = null;
      if (zi(s) && (te = Y.shadowRoot(s)))
        for (const ce of Array.from(Y.childNodes(te))) {
          const oe = Ee(ce, Z);
          oe && (je(te) && (oe.isShadow = !0), A.childNodes.push(oe));
        }
    }
    const Ue = Y.parentNode(s);
    return (
      Ue && Ve(Ue) && je(Ue) && (A.isShadow = !0),
      A.type === G.Element &&
        A.tagName === "iframe" &&
        Ca(
          s,
          () => {
            const Z = s.contentDocument;
            if (Z && S) {
              const te = Ee(Z, {
                doc: Z,
                mirror: r,
                blockClass: i,
                blockSelector: n,
                needsMask: M,
                maskTextClass: o,
                maskTextSelector: l,
                skipChild: !1,
                inlineStylesheet: u,
                maskInputOptions: c,
                maskTextFn: h,
                maskInputFn: m,
                slimDOMOptions: d,
                dataURLOptions: g,
                inlineImages: p,
                recordCanvas: f,
                preserveWhiteSpace: j,
                onSerialize: b,
                onIframeLoad: S,
                iframeLoadTimeout: y,
                onStylesheetLoad: C,
                stylesheetLoadTimeout: k,
                keepIframeSrcFn: L,
              });
              te && S(s, te);
            }
          },
          y,
        ),
      A.type === G.Element &&
        A.tagName === "link" &&
        typeof A.attributes.rel == "string" &&
        (A.attributes.rel === "stylesheet" ||
          (A.attributes.rel === "preload" &&
            typeof A.attributes.href == "string" &&
            ji(A.attributes.href) === "css")) &&
        va(
          s,
          () => {
            if (C) {
              const Z = Ee(s, {
                doc: t,
                mirror: r,
                blockClass: i,
                blockSelector: n,
                needsMask: M,
                maskTextClass: o,
                maskTextSelector: l,
                skipChild: !1,
                inlineStylesheet: u,
                maskInputOptions: c,
                maskTextFn: h,
                maskInputFn: m,
                slimDOMOptions: d,
                dataURLOptions: g,
                inlineImages: p,
                recordCanvas: f,
                preserveWhiteSpace: j,
                onSerialize: b,
                onIframeLoad: S,
                iframeLoadTimeout: y,
                onStylesheetLoad: C,
                stylesheetLoadTimeout: k,
                keepIframeSrcFn: L,
              });
              Z && C(s, Z);
            }
          },
          k,
        ),
      A
    );
  }
  function Aa(s, e) {
    const {
      mirror: t = new Vi(),
      blockClass: r = "rr-block",
      blockSelector: i = null,
      maskTextClass: n = "rr-mask",
      maskTextSelector: o = null,
      inlineStylesheet: l = !0,
      inlineImages: a = !1,
      recordCanvas: u = !1,
      maskAllInputs: c = !1,
      maskTextFn: h,
      maskInputFn: m,
      slimDOM: d = !1,
      dataURLOptions: g,
      preserveWhiteSpace: p,
      onSerialize: f,
      onIframeLoad: b,
      iframeLoadTimeout: S,
      onStylesheetLoad: y,
      stylesheetLoadTimeout: C,
      keepIframeSrcFn: k = () => !1,
    } = e || {};
    return Ee(s, {
      doc: s,
      mirror: t,
      blockClass: r,
      blockSelector: i,
      maskTextClass: n,
      maskTextSelector: o,
      skipChild: !1,
      inlineStylesheet: l,
      maskInputOptions:
        c === !0
          ? {
              color: !0,
              date: !0,
              "datetime-local": !0,
              email: !0,
              month: !0,
              number: !0,
              range: !0,
              search: !0,
              tel: !0,
              text: !0,
              time: !0,
              url: !0,
              week: !0,
              textarea: !0,
              select: !0,
              password: !0,
            }
          : c === !1
            ? { password: !0 }
            : c,
      maskTextFn: h,
      maskInputFn: m,
      slimDOMOptions:
        d === !0 || d === "all"
          ? {
              script: !0,
              comment: !0,
              headFavicon: !0,
              headWhitespace: !0,
              headMetaDescKeywords: d === "all",
              headMetaSocial: !0,
              headMetaRobots: !0,
              headMetaHttpEquiv: !0,
              headMetaAuthorship: !0,
              headMetaVerification: !0,
            }
          : d === !1
            ? {}
            : d,
      dataURLOptions: g,
      inlineImages: a,
      recordCanvas: u,
      preserveWhiteSpace: p,
      onSerialize: f,
      onIframeLoad: b,
      iframeLoadTimeout: S,
      onStylesheetLoad: y,
      stylesheetLoadTimeout: C,
      keepIframeSrcFn: k,
      newlyAddedElement: !1,
    });
  }
  function Ea(s) {
    return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
  }
  function $a(s) {
    if (s.__esModule) return s;
    var e = s.default;
    if (typeof e == "function") {
      var t = function r() {
        return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
      };
      t.prototype = e.prototype;
    } else t = {};
    return (
      Object.defineProperty(t, "__esModule", { value: !0 }),
      Object.keys(s).forEach(function (r) {
        var i = Object.getOwnPropertyDescriptor(s, r);
        Object.defineProperty(
          t,
          r,
          i.get
            ? i
            : {
                enumerable: !0,
                get: function () {
                  return s[r];
                },
              },
        );
      }),
      t
    );
  }
  var ps = { exports: {} },
    T = String,
    Xi = function () {
      return {
        isColorSupported: !1,
        reset: T,
        bold: T,
        dim: T,
        italic: T,
        underline: T,
        inverse: T,
        hidden: T,
        strikethrough: T,
        black: T,
        red: T,
        green: T,
        yellow: T,
        blue: T,
        magenta: T,
        cyan: T,
        white: T,
        gray: T,
        bgBlack: T,
        bgRed: T,
        bgGreen: T,
        bgYellow: T,
        bgBlue: T,
        bgMagenta: T,
        bgCyan: T,
        bgWhite: T,
      };
    };
  ps.exports = Xi();
  ps.exports.createColors = Xi;
  var Na = ps.exports;
  const ka = {},
    Pa = Object.freeze(
      Object.defineProperty({ __proto__: null, default: ka }, Symbol.toStringTag, { value: "Module" }),
    ),
    ie = $a(Pa);
  let Js = Na,
    Xs = ie,
    $r = class Ki extends Error {
      constructor(e, t, r, i, n, o) {
        super(e),
          (this.name = "CssSyntaxError"),
          (this.reason = e),
          n && (this.file = n),
          i && (this.source = i),
          o && (this.plugin = o),
          typeof t != "undefined" &&
            typeof r != "undefined" &&
            (typeof t == "number"
              ? ((this.line = t), (this.column = r))
              : ((this.line = t.line), (this.column = t.column), (this.endLine = r.line), (this.endColumn = r.column))),
          this.setMessage(),
          Error.captureStackTrace && Error.captureStackTrace(this, Ki);
      }
      setMessage() {
        (this.message = this.plugin ? this.plugin + ": " : ""),
          (this.message += this.file ? this.file : "<css input>"),
          typeof this.line != "undefined" && (this.message += ":" + this.line + ":" + this.column),
          (this.message += ": " + this.reason);
      }
      showSourceCode(e) {
        if (!this.source) return "";
        let t = this.source;
        e == null && (e = Js.isColorSupported), Xs && e && (t = Xs(t));
        let r = t.split(/\r?\n/),
          i = Math.max(this.line - 3, 0),
          n = Math.min(this.line + 2, r.length),
          o = String(n).length,
          l,
          a;
        if (e) {
          let { bold: u, gray: c, red: h } = Js.createColors(!0);
          (l = (m) => u(h(m))), (a = (m) => c(m));
        } else l = a = (u) => u;
        return r.slice(i, n).map((u, c) => {
          let h = i + 1 + c,
            m = " " + (" " + h).slice(-o) + " | ";
          if (h === this.line) {
            let d = a(m.replace(/\d/g, " ")) + u.slice(0, this.column - 1).replace(/[^\t]/g, " ");
            return (
              l(">") +
              a(m) +
              u +
              `
 ` +
              d +
              l("^")
            );
          }
          return " " + a(m) + u;
        }).join(`
`);
      }
      toString() {
        let e = this.showSourceCode();
        return (
          e &&
            (e =
              `

` +
              e +
              `
`),
          this.name + ": " + this.message + e
        );
      }
    };
  var ds = $r;
  $r.default = $r;
  var st = {};
  st.isClean = Symbol("isClean");
  st.my = Symbol("my");
  const Ks = {
    after: `
`,
    beforeClose: `
`,
    beforeComment: `
`,
    beforeDecl: `
`,
    beforeOpen: " ",
    beforeRule: `
`,
    colon: ": ",
    commentLeft: " ",
    commentRight: " ",
    emptyBody: "",
    indent: "    ",
    semicolon: !1,
  };
  function Da(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  let Nr = class {
    constructor(e) {
      this.builder = e;
    }
    atrule(e, t) {
      let r = "@" + e.name,
        i = e.params ? this.rawValue(e, "params") : "";
      if ((typeof e.raws.afterName != "undefined" ? (r += e.raws.afterName) : i && (r += " "), e.nodes))
        this.block(e, r + i);
      else {
        let n = (e.raws.between || "") + (t ? ";" : "");
        this.builder(r + i + n, e);
      }
    }
    beforeAfter(e, t) {
      let r;
      e.type === "decl"
        ? (r = this.raw(e, null, "beforeDecl"))
        : e.type === "comment"
          ? (r = this.raw(e, null, "beforeComment"))
          : t === "before"
            ? (r = this.raw(e, null, "beforeRule"))
            : (r = this.raw(e, null, "beforeClose"));
      let i = e.parent,
        n = 0;
      for (; i && i.type !== "root"; ) (n += 1), (i = i.parent);
      if (
        r.includes(`
`)
      ) {
        let o = this.raw(e, null, "indent");
        if (o.length) for (let l = 0; l < n; l++) r += o;
      }
      return r;
    }
    block(e, t) {
      let r = this.raw(e, "between", "beforeOpen");
      this.builder(t + r + "{", e, "start");
      let i;
      e.nodes && e.nodes.length ? (this.body(e), (i = this.raw(e, "after"))) : (i = this.raw(e, "after", "emptyBody")),
        i && this.builder(i),
        this.builder("}", e, "end");
    }
    body(e) {
      let t = e.nodes.length - 1;
      for (; t > 0 && e.nodes[t].type === "comment"; ) t -= 1;
      let r = this.raw(e, "semicolon");
      for (let i = 0; i < e.nodes.length; i++) {
        let n = e.nodes[i],
          o = this.raw(n, "before");
        o && this.builder(o), this.stringify(n, t !== i || r);
      }
    }
    comment(e) {
      let t = this.raw(e, "left", "commentLeft"),
        r = this.raw(e, "right", "commentRight");
      this.builder("/*" + t + e.text + r + "*/", e);
    }
    decl(e, t) {
      let r = this.raw(e, "between", "colon"),
        i = e.prop + r + this.rawValue(e, "value");
      e.important && (i += e.raws.important || " !important"), t && (i += ";"), this.builder(i, e);
    }
    document(e) {
      this.body(e);
    }
    raw(e, t, r) {
      let i;
      if ((r || (r = t), t && ((i = e.raws[t]), typeof i != "undefined"))) return i;
      let n = e.parent;
      if (r === "before" && (!n || (n.type === "root" && n.first === e) || (n && n.type === "document"))) return "";
      if (!n) return Ks[r];
      let o = e.root();
      if ((o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] != "undefined")) return o.rawCache[r];
      if (r === "before" || r === "after") return this.beforeAfter(e, r);
      {
        let l = "raw" + Da(r);
        this[l]
          ? (i = this[l](o, e))
          : o.walk((a) => {
              if (((i = a.raws[t]), typeof i != "undefined")) return !1;
            });
      }
      return typeof i == "undefined" && (i = Ks[r]), (o.rawCache[r] = i), i;
    }
    rawBeforeClose(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.nodes && r.nodes.length > 0 && typeof r.raws.after != "undefined")
            return (
              (t = r.raws.after),
              t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        t && (t = t.replace(/\S/g, "")),
        t
      );
    }
    rawBeforeComment(e, t) {
      let r;
      return (
        e.walkComments((i) => {
          if (typeof i.raws.before != "undefined")
            return (
              (r = i.raws.before),
              r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        typeof r == "undefined" ? (r = this.raw(t, null, "beforeDecl")) : r && (r = r.replace(/\S/g, "")),
        r
      );
    }
    rawBeforeDecl(e, t) {
      let r;
      return (
        e.walkDecls((i) => {
          if (typeof i.raws.before != "undefined")
            return (
              (r = i.raws.before),
              r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        typeof r == "undefined" ? (r = this.raw(t, null, "beforeRule")) : r && (r = r.replace(/\S/g, "")),
        r
      );
    }
    rawBeforeOpen(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.type !== "decl" && ((t = r.raws.between), typeof t != "undefined")) return !1;
        }),
        t
      );
    }
    rawBeforeRule(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.nodes && (r.parent !== e || e.first !== r) && typeof r.raws.before != "undefined")
            return (
              (t = r.raws.before),
              t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        t && (t = t.replace(/\S/g, "")),
        t
      );
    }
    rawColon(e) {
      let t;
      return (
        e.walkDecls((r) => {
          if (typeof r.raws.between != "undefined") return (t = r.raws.between.replace(/[^\s:]/g, "")), !1;
        }),
        t
      );
    }
    rawEmptyBody(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.nodes && r.nodes.length === 0 && ((t = r.raws.after), typeof t != "undefined")) return !1;
        }),
        t
      );
    }
    rawIndent(e) {
      if (e.raws.indent) return e.raws.indent;
      let t;
      return (
        e.walk((r) => {
          let i = r.parent;
          if (i && i !== e && i.parent && i.parent === e && typeof r.raws.before != "undefined") {
            let n = r.raws.before.split(`
`);
            return (t = n[n.length - 1]), (t = t.replace(/\S/g, "")), !1;
          }
        }),
        t
      );
    }
    rawSemicolon(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.nodes && r.nodes.length && r.last.type === "decl" && ((t = r.raws.semicolon), typeof t != "undefined"))
            return !1;
        }),
        t
      );
    }
    rawValue(e, t) {
      let r = e[t],
        i = e.raws[t];
      return i && i.value === r ? i.raw : r;
    }
    root(e) {
      this.body(e), e.raws.after && this.builder(e.raws.after);
    }
    rule(e) {
      this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
    }
    stringify(e, t) {
      if (!this[e.type])
        throw new Error("Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier.");
      this[e.type](e, t);
    }
  };
  var Qi = Nr;
  Nr.default = Nr;
  let La = Qi;
  function kr(s, e) {
    new La(e).stringify(s);
  }
  var tr = kr;
  kr.default = kr;
  let { isClean: pt, my: Ta } = st,
    _a = ds,
    Fa = Qi,
    Ua = tr;
  function Pr(s, e) {
    let t = new s.constructor();
    for (let r in s) {
      if (!Object.prototype.hasOwnProperty.call(s, r) || r === "proxyCache") continue;
      let i = s[r],
        n = typeof i;
      r === "parent" && n === "object"
        ? e && (t[r] = e)
        : r === "source"
          ? (t[r] = i)
          : Array.isArray(i)
            ? (t[r] = i.map((o) => Pr(o, t)))
            : (n === "object" && i !== null && (i = Pr(i)), (t[r] = i));
    }
    return t;
  }
  let Dr = class {
    constructor(e = {}) {
      (this.raws = {}), (this[pt] = !1), (this[Ta] = !0);
      for (let t in e)
        if (t === "nodes") {
          this.nodes = [];
          for (let r of e[t]) typeof r.clone == "function" ? this.append(r.clone()) : this.append(r);
        } else this[t] = e[t];
    }
    addToError(e) {
      if (((e.postcssNode = this), e.stack && this.source && /\n\s{4}at /.test(e.stack))) {
        let t = this.source;
        e.stack = e.stack.replace(/\n\s{4}at /, `$&${t.input.from}:${t.start.line}:${t.start.column}$&`);
      }
      return e;
    }
    after(e) {
      return this.parent.insertAfter(this, e), this;
    }
    assign(e = {}) {
      for (let t in e) this[t] = e[t];
      return this;
    }
    before(e) {
      return this.parent.insertBefore(this, e), this;
    }
    cleanRaws(e) {
      delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
    }
    clone(e = {}) {
      let t = Pr(this);
      for (let r in e) t[r] = e[r];
      return t;
    }
    cloneAfter(e = {}) {
      let t = this.clone(e);
      return this.parent.insertAfter(this, t), t;
    }
    cloneBefore(e = {}) {
      let t = this.clone(e);
      return this.parent.insertBefore(this, t), t;
    }
    error(e, t = {}) {
      if (this.source) {
        let { end: r, start: i } = this.rangeBy(t);
        return this.source.input.error(e, { column: i.column, line: i.line }, { column: r.column, line: r.line }, t);
      }
      return new _a(e);
    }
    getProxyProcessor() {
      return {
        get(e, t) {
          return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
        },
        set(e, t, r) {
          return (
            e[t] === r ||
              ((e[t] = r),
              (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || t === "text") &&
                e.markDirty()),
            !0
          );
        },
      };
    }
    markDirty() {
      if (this[pt]) {
        this[pt] = !1;
        let e = this;
        for (; (e = e.parent); ) e[pt] = !1;
      }
    }
    next() {
      if (!this.parent) return;
      let e = this.parent.index(this);
      return this.parent.nodes[e + 1];
    }
    positionBy(e, t) {
      let r = this.source.start;
      if (e.index) r = this.positionInside(e.index, t);
      else if (e.word) {
        t = this.toString();
        let i = t.indexOf(e.word);
        i !== -1 && (r = this.positionInside(i, t));
      }
      return r;
    }
    positionInside(e, t) {
      let r = t || this.toString(),
        i = this.source.start.column,
        n = this.source.start.line;
      for (let o = 0; o < e; o++)
        r[o] ===
        `
`
          ? ((i = 1), (n += 1))
          : (i += 1);
      return { column: i, line: n };
    }
    prev() {
      if (!this.parent) return;
      let e = this.parent.index(this);
      return this.parent.nodes[e - 1];
    }
    rangeBy(e) {
      let t = { column: this.source.start.column, line: this.source.start.line },
        r = this.source.end
          ? { column: this.source.end.column + 1, line: this.source.end.line }
          : { column: t.column + 1, line: t.line };
      if (e.word) {
        let i = this.toString(),
          n = i.indexOf(e.word);
        n !== -1 && ((t = this.positionInside(n, i)), (r = this.positionInside(n + e.word.length, i)));
      } else
        e.start ? (t = { column: e.start.column, line: e.start.line }) : e.index && (t = this.positionInside(e.index)),
          e.end
            ? (r = { column: e.end.column, line: e.end.line })
            : typeof e.endIndex == "number"
              ? (r = this.positionInside(e.endIndex))
              : e.index && (r = this.positionInside(e.index + 1));
      return (
        (r.line < t.line || (r.line === t.line && r.column <= t.column)) &&
          (r = { column: t.column + 1, line: t.line }),
        { end: r, start: t }
      );
    }
    raw(e, t) {
      return new Fa().raw(this, e, t);
    }
    remove() {
      return this.parent && this.parent.removeChild(this), (this.parent = void 0), this;
    }
    replaceWith(...e) {
      if (this.parent) {
        let t = this,
          r = !1;
        for (let i of e)
          i === this ? (r = !0) : r ? (this.parent.insertAfter(t, i), (t = i)) : this.parent.insertBefore(t, i);
        r || this.remove();
      }
      return this;
    }
    root() {
      let e = this;
      for (; e.parent && e.parent.type !== "document"; ) e = e.parent;
      return e;
    }
    toJSON(e, t) {
      let r = {},
        i = t == null;
      t = t || new Map();
      let n = 0;
      for (let o in this) {
        if (!Object.prototype.hasOwnProperty.call(this, o) || o === "parent" || o === "proxyCache") continue;
        let l = this[o];
        if (Array.isArray(l)) r[o] = l.map((a) => (typeof a == "object" && a.toJSON ? a.toJSON(null, t) : a));
        else if (typeof l == "object" && l.toJSON) r[o] = l.toJSON(null, t);
        else if (o === "source") {
          let a = t.get(l.input);
          a == null && ((a = n), t.set(l.input, n), n++), (r[o] = { end: l.end, inputId: a, start: l.start });
        } else r[o] = l;
      }
      return i && (r.inputs = [...t.keys()].map((o) => o.toJSON())), r;
    }
    toProxy() {
      return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
    }
    toString(e = Ua) {
      e.stringify && (e = e.stringify);
      let t = "";
      return (
        e(this, (r) => {
          t += r;
        }),
        t
      );
    }
    warn(e, t, r) {
      let i = { node: this };
      for (let n in r) i[n] = r[n];
      return e.warn(t, i);
    }
    get proxyOf() {
      return this;
    }
  };
  var rr = Dr;
  Dr.default = Dr;
  let Ba = rr,
    Lr = class extends Ba {
      constructor(e) {
        e &&
          typeof e.value != "undefined" &&
          typeof e.value != "string" &&
          (e = q(x({}, e), { value: String(e.value) })),
          super(e),
          (this.type = "decl");
      }
      get variable() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    };
  var sr = Lr;
  Lr.default = Lr;
  let Wa = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",
    za =
      (s, e = 21) =>
      (t = e) => {
        let r = "",
          i = t;
        for (; i--; ) r += s[(Math.random() * s.length) | 0];
        return r;
      },
    Ga = (s = 21) => {
      let e = "",
        t = s;
      for (; t--; ) e += Wa[(Math.random() * 64) | 0];
      return e;
    };
  var Va = { nanoid: Ga, customAlphabet: za };
  let { SourceMapConsumer: Qs, SourceMapGenerator: qs } = ie,
    { existsSync: ja, readFileSync: Ha } = ie,
    { dirname: wr, join: Ya } = ie;
  function Za(s) {
    return Buffer ? Buffer.from(s, "base64").toString() : window.atob(s);
  }
  let Tr = class {
    constructor(e, t) {
      if (t.map === !1) return;
      this.loadAnnotation(e), (this.inline = this.startWith(this.annotation, "data:"));
      let r = t.map ? t.map.prev : void 0,
        i = this.loadMap(t.from, r);
      !this.mapFile && t.from && (this.mapFile = t.from),
        this.mapFile && (this.root = wr(this.mapFile)),
        i && (this.text = i);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new Qs(this.text)), this.consumerCache;
    }
    decodeInline(e) {
      let t = /^data:application\/json;charset=utf-?8;base64,/,
        r = /^data:application\/json;base64,/,
        i = /^data:application\/json;charset=utf-?8,/,
        n = /^data:application\/json,/;
      if (i.test(e) || n.test(e)) return decodeURIComponent(e.substr(RegExp.lastMatch.length));
      if (t.test(e) || r.test(e)) return Za(e.substr(RegExp.lastMatch.length));
      let o = e.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + o);
    }
    getAnnotationURL(e) {
      return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(e) {
      return typeof e != "object"
        ? !1
        : typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections);
    }
    loadAnnotation(e) {
      let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
      if (!t) return;
      let r = e.lastIndexOf(t.pop()),
        i = e.indexOf("*/", r);
      r > -1 && i > -1 && (this.annotation = this.getAnnotationURL(e.substring(r, i)));
    }
    loadFile(e) {
      if (((this.root = wr(e)), ja(e))) return (this.mapFile = e), Ha(e, "utf-8").toString().trim();
    }
    loadMap(e, t) {
      if (t === !1) return !1;
      if (t) {
        if (typeof t == "string") return t;
        if (typeof t == "function") {
          let r = t(e);
          if (r) {
            let i = this.loadFile(r);
            if (!i) throw new Error("Unable to load previous source map: " + r.toString());
            return i;
          }
        } else {
          if (t instanceof Qs) return qs.fromSourceMap(t).toString();
          if (t instanceof qs) return t.toString();
          if (this.isMap(t)) return JSON.stringify(t);
          throw new Error("Unsupported previous source map format: " + t.toString());
        }
      } else {
        if (this.inline) return this.decodeInline(this.annotation);
        if (this.annotation) {
          let r = this.annotation;
          return e && (r = Ya(wr(e), r)), this.loadFile(r);
        }
      }
    }
    startWith(e, t) {
      return e ? e.substr(0, t.length) === t : !1;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  };
  var qi = Tr;
  Tr.default = Tr;
  let { SourceMapConsumer: Ja, SourceMapGenerator: Xa } = ie,
    { fileURLToPath: ei, pathToFileURL: dt } = ie,
    { isAbsolute: _r, resolve: Fr } = ie,
    { nanoid: Ka } = Va,
    Sr = ie,
    ti = ds,
    Qa = qi,
    br = Symbol("fromOffsetCache"),
    qa = !!(Ja && Xa),
    ri = !!(Fr && _r),
    Vt = class {
      constructor(e, t = {}) {
        if (e === null || typeof e == "undefined" || (typeof e == "object" && !e.toString))
          throw new Error(`PostCSS received ${e} instead of CSS string`);
        if (
          ((this.css = e.toString()),
          this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE"
            ? ((this.hasBOM = !0), (this.css = this.css.slice(1)))
            : (this.hasBOM = !1),
          t.from && (!ri || /^\w+:\/\//.test(t.from) || _r(t.from) ? (this.file = t.from) : (this.file = Fr(t.from))),
          ri && qa)
        ) {
          let r = new Qa(this.css, t);
          if (r.text) {
            this.map = r;
            let i = r.consumer().file;
            !this.file && i && (this.file = this.mapResolve(i));
          }
        }
        this.file || (this.id = "<input css " + Ka(6) + ">"), this.map && (this.map.file = this.from);
      }
      error(e, t, r, i = {}) {
        let n, o, l;
        if (t && typeof t == "object") {
          let u = t,
            c = r;
          if (typeof u.offset == "number") {
            let h = this.fromOffset(u.offset);
            (t = h.line), (r = h.col);
          } else (t = u.line), (r = u.column);
          if (typeof c.offset == "number") {
            let h = this.fromOffset(c.offset);
            (o = h.line), (l = h.col);
          } else (o = c.line), (l = c.column);
        } else if (!r) {
          let u = this.fromOffset(t);
          (t = u.line), (r = u.col);
        }
        let a = this.origin(t, r, o, l);
        return (
          a
            ? (n = new ti(
                e,
                a.endLine === void 0 ? a.line : { column: a.column, line: a.line },
                a.endLine === void 0 ? a.column : { column: a.endColumn, line: a.endLine },
                a.source,
                a.file,
                i.plugin,
              ))
            : (n = new ti(
                e,
                o === void 0 ? t : { column: r, line: t },
                o === void 0 ? r : { column: l, line: o },
                this.css,
                this.file,
                i.plugin,
              )),
          (n.input = { column: r, endColumn: l, endLine: o, line: t, source: this.css }),
          this.file && (dt && (n.input.url = dt(this.file).toString()), (n.input.file = this.file)),
          n
        );
      }
      fromOffset(e) {
        let t, r;
        if (this[br]) r = this[br];
        else {
          let n = this.css.split(`
`);
          r = new Array(n.length);
          let o = 0;
          for (let l = 0, a = n.length; l < a; l++) (r[l] = o), (o += n[l].length + 1);
          this[br] = r;
        }
        t = r[r.length - 1];
        let i = 0;
        if (e >= t) i = r.length - 1;
        else {
          let n = r.length - 2,
            o;
          for (; i < n; )
            if (((o = i + ((n - i) >> 1)), e < r[o])) n = o - 1;
            else if (e >= r[o + 1]) i = o + 1;
            else {
              i = o;
              break;
            }
        }
        return { col: e - r[i] + 1, line: i + 1 };
      }
      mapResolve(e) {
        return /^\w+:\/\//.test(e) ? e : Fr(this.map.consumer().sourceRoot || this.map.root || ".", e);
      }
      origin(e, t, r, i) {
        if (!this.map) return !1;
        let n = this.map.consumer(),
          o = n.originalPositionFor({ column: t, line: e });
        if (!o.source) return !1;
        let l;
        typeof r == "number" && (l = n.originalPositionFor({ column: i, line: r }));
        let a;
        _r(o.source)
          ? (a = dt(o.source))
          : (a = new URL(o.source, this.map.consumer().sourceRoot || dt(this.map.mapFile)));
        let u = { column: o.column, endColumn: l && l.column, endLine: l && l.line, line: o.line, url: a.toString() };
        if (a.protocol === "file:")
          if (ei) u.file = ei(a);
          else throw new Error("file: protocol is not available in this PostCSS build");
        let c = n.sourceContentFor(o.source);
        return c && (u.source = c), u;
      }
      toJSON() {
        let e = {};
        for (let t of ["hasBOM", "css", "file", "id"]) this[t] != null && (e[t] = this[t]);
        return this.map && ((e.map = x({}, this.map)), e.map.consumerCache && (e.map.consumerCache = void 0)), e;
      }
      get from() {
        return this.file || this.id;
      }
    };
  var ir = Vt;
  Vt.default = Vt;
  Sr && Sr.registerInput && Sr.registerInput(Vt);
  let { SourceMapConsumer: en, SourceMapGenerator: Lt } = ie,
    { dirname: Tt, relative: tn, resolve: rn, sep: sn } = ie,
    { pathToFileURL: si } = ie,
    el = ir,
    tl = !!(en && Lt),
    rl = !!(Tt && rn && tn && sn),
    sl = class {
      constructor(e, t, r, i) {
        (this.stringify = e),
          (this.mapOpts = r.map || {}),
          (this.root = t),
          (this.opts = r),
          (this.css = i),
          (this.originalCSS = i),
          (this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute),
          (this.memoizedFileURLs = new Map()),
          (this.memoizedPaths = new Map()),
          (this.memoizedURLs = new Map());
      }
      addAnnotation() {
        let e;
        this.isInline()
          ? (e = "data:application/json;base64," + this.toBase64(this.map.toString()))
          : typeof this.mapOpts.annotation == "string"
            ? (e = this.mapOpts.annotation)
            : typeof this.mapOpts.annotation == "function"
              ? (e = this.mapOpts.annotation(this.opts.to, this.root))
              : (e = this.outputFile() + ".map");
        let t = `
`;
        this.css.includes(`\r
`) &&
          (t = `\r
`),
          (this.css += t + "/*# sourceMappingURL=" + e + " */");
      }
      applyPrevMaps() {
        for (let e of this.previous()) {
          let t = this.toUrl(this.path(e.file)),
            r = e.root || Tt(e.file),
            i;
          this.mapOpts.sourcesContent === !1
            ? ((i = new en(e.text)), i.sourcesContent && (i.sourcesContent = null))
            : (i = e.consumer()),
            this.map.applySourceMap(i, t, this.toUrl(this.path(r)));
        }
      }
      clearAnnotation() {
        if (this.mapOpts.annotation !== !1)
          if (this.root) {
            let e;
            for (let t = this.root.nodes.length - 1; t >= 0; t--)
              (e = this.root.nodes[t]),
                e.type === "comment" && e.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(t);
          } else this.css && (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
      }
      generate() {
        if ((this.clearAnnotation(), rl && tl && this.isMap())) return this.generateMap();
        {
          let e = "";
          return (
            this.stringify(this.root, (t) => {
              e += t;
            }),
            [e]
          );
        }
      }
      generateMap() {
        if (this.root) this.generateString();
        else if (this.previous().length === 1) {
          let e = this.previous()[0].consumer();
          (e.file = this.outputFile()), (this.map = Lt.fromSourceMap(e, { ignoreInvalidMapping: !0 }));
        } else
          (this.map = new Lt({ file: this.outputFile(), ignoreInvalidMapping: !0 })),
            this.map.addMapping({
              generated: { column: 0, line: 1 },
              original: { column: 0, line: 1 },
              source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>",
            });
        return (
          this.isSourcesContent() && this.setSourcesContent(),
          this.root && this.previous().length > 0 && this.applyPrevMaps(),
          this.isAnnotation() && this.addAnnotation(),
          this.isInline() ? [this.css] : [this.css, this.map]
        );
      }
      generateString() {
        (this.css = ""), (this.map = new Lt({ file: this.outputFile(), ignoreInvalidMapping: !0 }));
        let e = 1,
          t = 1,
          r = "<no source>",
          i = { generated: { column: 0, line: 0 }, original: { column: 0, line: 0 }, source: "" },
          n,
          o;
        this.stringify(this.root, (l, a, u) => {
          if (
            ((this.css += l),
            a &&
              u !== "end" &&
              ((i.generated.line = e),
              (i.generated.column = t - 1),
              a.source && a.source.start
                ? ((i.source = this.sourcePath(a)),
                  (i.original.line = a.source.start.line),
                  (i.original.column = a.source.start.column - 1),
                  this.map.addMapping(i))
                : ((i.source = r), (i.original.line = 1), (i.original.column = 0), this.map.addMapping(i))),
            (n = l.match(/\n/g)),
            n
              ? ((e += n.length),
                (o = l.lastIndexOf(`
`)),
                (t = l.length - o))
              : (t += l.length),
            a && u !== "start")
          ) {
            let c = a.parent || { raws: {} };
            (!(a.type === "decl" || (a.type === "atrule" && !a.nodes)) || a !== c.last || c.raws.semicolon) &&
              (a.source && a.source.end
                ? ((i.source = this.sourcePath(a)),
                  (i.original.line = a.source.end.line),
                  (i.original.column = a.source.end.column - 1),
                  (i.generated.line = e),
                  (i.generated.column = t - 2),
                  this.map.addMapping(i))
                : ((i.source = r),
                  (i.original.line = 1),
                  (i.original.column = 0),
                  (i.generated.line = e),
                  (i.generated.column = t - 1),
                  this.map.addMapping(i)));
          }
        });
      }
      isAnnotation() {
        return this.isInline()
          ? !0
          : typeof this.mapOpts.annotation != "undefined"
            ? this.mapOpts.annotation
            : this.previous().length
              ? this.previous().some((e) => e.annotation)
              : !0;
      }
      isInline() {
        if (typeof this.mapOpts.inline != "undefined") return this.mapOpts.inline;
        let e = this.mapOpts.annotation;
        return typeof e != "undefined" && e !== !0
          ? !1
          : this.previous().length
            ? this.previous().some((t) => t.inline)
            : !0;
      }
      isMap() {
        return typeof this.opts.map != "undefined" ? !!this.opts.map : this.previous().length > 0;
      }
      isSourcesContent() {
        return typeof this.mapOpts.sourcesContent != "undefined"
          ? this.mapOpts.sourcesContent
          : this.previous().length
            ? this.previous().some((e) => e.withContent())
            : !0;
      }
      outputFile() {
        return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
      }
      path(e) {
        if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
        let t = this.memoizedPaths.get(e);
        if (t) return t;
        let r = this.opts.to ? Tt(this.opts.to) : ".";
        typeof this.mapOpts.annotation == "string" && (r = Tt(rn(r, this.mapOpts.annotation)));
        let i = tn(r, e);
        return this.memoizedPaths.set(e, i), i;
      }
      previous() {
        if (!this.previousMaps)
          if (((this.previousMaps = []), this.root))
            this.root.walk((e) => {
              if (e.source && e.source.input.map) {
                let t = e.source.input.map;
                this.previousMaps.includes(t) || this.previousMaps.push(t);
              }
            });
          else {
            let e = new el(this.originalCSS, this.opts);
            e.map && this.previousMaps.push(e.map);
          }
        return this.previousMaps;
      }
      setSourcesContent() {
        let e = {};
        if (this.root)
          this.root.walk((t) => {
            if (t.source) {
              let r = t.source.input.from;
              if (r && !e[r]) {
                e[r] = !0;
                let i = this.usesFileUrls ? this.toFileUrl(r) : this.toUrl(this.path(r));
                this.map.setSourceContent(i, t.source.input.css);
              }
            }
          });
        else if (this.css) {
          let t = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
          this.map.setSourceContent(t, this.css);
        }
      }
      sourcePath(e) {
        return this.mapOpts.from
          ? this.toUrl(this.mapOpts.from)
          : this.usesFileUrls
            ? this.toFileUrl(e.source.input.from)
            : this.toUrl(this.path(e.source.input.from));
      }
      toBase64(e) {
        return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
      }
      toFileUrl(e) {
        let t = this.memoizedFileURLs.get(e);
        if (t) return t;
        if (si) {
          let r = si(e).toString();
          return this.memoizedFileURLs.set(e, r), r;
        } else throw new Error("`map.absolute` option is not available in this PostCSS build");
      }
      toUrl(e) {
        let t = this.memoizedURLs.get(e);
        if (t) return t;
        sn === "\\" && (e = e.replace(/\\/g, "/"));
        let r = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
        return this.memoizedURLs.set(e, r), r;
      }
    };
  var nn = sl;
  let il = rr,
    Ur = class extends il {
      constructor(e) {
        super(e), (this.type = "comment");
      }
    };
  var nr = Ur;
  Ur.default = Ur;
  let { isClean: on, my: an } = st,
    ln = sr,
    un = nr,
    nl = rr,
    cn,
    ms,
    gs,
    hn;
  function fn(s) {
    return s.map((e) => (e.nodes && (e.nodes = fn(e.nodes)), delete e.source, e));
  }
  function pn(s) {
    if (((s[on] = !1), s.proxyOf.nodes)) for (let e of s.proxyOf.nodes) pn(e);
  }
  let fe = class dn extends nl {
    append(...e) {
      for (let t of e) {
        let r = this.normalize(t, this.last);
        for (let i of r) this.proxyOf.nodes.push(i);
      }
      return this.markDirty(), this;
    }
    cleanRaws(e) {
      if ((super.cleanRaws(e), this.nodes)) for (let t of this.nodes) t.cleanRaws(e);
    }
    each(e) {
      if (!this.proxyOf.nodes) return;
      let t = this.getIterator(),
        r,
        i;
      for (
        ;
        this.indexes[t] < this.proxyOf.nodes.length &&
        ((r = this.indexes[t]), (i = e(this.proxyOf.nodes[r], r)), i !== !1);

      )
        this.indexes[t] += 1;
      return delete this.indexes[t], i;
    }
    every(e) {
      return this.nodes.every(e);
    }
    getIterator() {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), (this.lastEach += 1);
      let e = this.lastEach;
      return (this.indexes[e] = 0), e;
    }
    getProxyProcessor() {
      return {
        get(e, t) {
          return t === "proxyOf"
            ? e
            : e[t]
              ? t === "each" || (typeof t == "string" && t.startsWith("walk"))
                ? (...r) => e[t](...r.map((i) => (typeof i == "function" ? (n, o) => i(n.toProxy(), o) : i)))
                : t === "every" || t === "some"
                  ? (r) => e[t]((i, ...n) => r(i.toProxy(), ...n))
                  : t === "root"
                    ? () => e.root().toProxy()
                    : t === "nodes"
                      ? e.nodes.map((r) => r.toProxy())
                      : t === "first" || t === "last"
                        ? e[t].toProxy()
                        : e[t]
              : e[t];
        },
        set(e, t, r) {
          return e[t] === r || ((e[t] = r), (t === "name" || t === "params" || t === "selector") && e.markDirty()), !0;
        },
      };
    }
    index(e) {
      return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
    }
    insertAfter(e, t) {
      let r = this.index(e),
        i = this.normalize(t, this.proxyOf.nodes[r]).reverse();
      r = this.index(e);
      for (let o of i) this.proxyOf.nodes.splice(r + 1, 0, o);
      let n;
      for (let o in this.indexes) (n = this.indexes[o]), r < n && (this.indexes[o] = n + i.length);
      return this.markDirty(), this;
    }
    insertBefore(e, t) {
      let r = this.index(e),
        i = r === 0 ? "prepend" : !1,
        n = this.normalize(t, this.proxyOf.nodes[r], i).reverse();
      r = this.index(e);
      for (let l of n) this.proxyOf.nodes.splice(r, 0, l);
      let o;
      for (let l in this.indexes) (o = this.indexes[l]), r <= o && (this.indexes[l] = o + n.length);
      return this.markDirty(), this;
    }
    normalize(e, t) {
      if (typeof e == "string") e = fn(cn(e).nodes);
      else if (typeof e == "undefined") e = [];
      else if (Array.isArray(e)) {
        e = e.slice(0);
        for (let i of e) i.parent && i.parent.removeChild(i, "ignore");
      } else if (e.type === "root" && this.type !== "document") {
        e = e.nodes.slice(0);
        for (let i of e) i.parent && i.parent.removeChild(i, "ignore");
      } else if (e.type) e = [e];
      else if (e.prop) {
        if (typeof e.value == "undefined") throw new Error("Value field is missed in node creation");
        typeof e.value != "string" && (e.value = String(e.value)), (e = [new ln(e)]);
      } else if (e.selector) e = [new ms(e)];
      else if (e.name) e = [new gs(e)];
      else if (e.text) e = [new un(e)];
      else throw new Error("Unknown node type in node creation");
      return e.map(
        (i) => (
          i[an] || dn.rebuild(i),
          (i = i.proxyOf),
          i.parent && i.parent.removeChild(i),
          i[on] && pn(i),
          typeof i.raws.before == "undefined" &&
            t &&
            typeof t.raws.before != "undefined" &&
            (i.raws.before = t.raws.before.replace(/\S/g, "")),
          (i.parent = this.proxyOf),
          i
        ),
      );
    }
    prepend(...e) {
      e = e.reverse();
      for (let t of e) {
        let r = this.normalize(t, this.first, "prepend").reverse();
        for (let i of r) this.proxyOf.nodes.unshift(i);
        for (let i in this.indexes) this.indexes[i] = this.indexes[i] + r.length;
      }
      return this.markDirty(), this;
    }
    push(e) {
      return (e.parent = this), this.proxyOf.nodes.push(e), this;
    }
    removeAll() {
      for (let e of this.proxyOf.nodes) e.parent = void 0;
      return (this.proxyOf.nodes = []), this.markDirty(), this;
    }
    removeChild(e) {
      (e = this.index(e)), (this.proxyOf.nodes[e].parent = void 0), this.proxyOf.nodes.splice(e, 1);
      let t;
      for (let r in this.indexes) (t = this.indexes[r]), t >= e && (this.indexes[r] = t - 1);
      return this.markDirty(), this;
    }
    replaceValues(e, t, r) {
      return (
        r || ((r = t), (t = {})),
        this.walkDecls((i) => {
          (t.props && !t.props.includes(i.prop)) ||
            (t.fast && !i.value.includes(t.fast)) ||
            (i.value = i.value.replace(e, r));
        }),
        this.markDirty(),
        this
      );
    }
    some(e) {
      return this.nodes.some(e);
    }
    walk(e) {
      return this.each((t, r) => {
        let i;
        try {
          i = e(t, r);
        } catch (n) {
          throw t.addToError(n);
        }
        return i !== !1 && t.walk && (i = t.walk(e)), i;
      });
    }
    walkAtRules(e, t) {
      return t
        ? e instanceof RegExp
          ? this.walk((r, i) => {
              if (r.type === "atrule" && e.test(r.name)) return t(r, i);
            })
          : this.walk((r, i) => {
              if (r.type === "atrule" && r.name === e) return t(r, i);
            })
        : ((t = e),
          this.walk((r, i) => {
            if (r.type === "atrule") return t(r, i);
          }));
    }
    walkComments(e) {
      return this.walk((t, r) => {
        if (t.type === "comment") return e(t, r);
      });
    }
    walkDecls(e, t) {
      return t
        ? e instanceof RegExp
          ? this.walk((r, i) => {
              if (r.type === "decl" && e.test(r.prop)) return t(r, i);
            })
          : this.walk((r, i) => {
              if (r.type === "decl" && r.prop === e) return t(r, i);
            })
        : ((t = e),
          this.walk((r, i) => {
            if (r.type === "decl") return t(r, i);
          }));
    }
    walkRules(e, t) {
      return t
        ? e instanceof RegExp
          ? this.walk((r, i) => {
              if (r.type === "rule" && e.test(r.selector)) return t(r, i);
            })
          : this.walk((r, i) => {
              if (r.type === "rule" && r.selector === e) return t(r, i);
            })
        : ((t = e),
          this.walk((r, i) => {
            if (r.type === "rule") return t(r, i);
          }));
    }
    get first() {
      if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
    }
    get last() {
      if (this.proxyOf.nodes) return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
  };
  fe.registerParse = (s) => {
    cn = s;
  };
  fe.registerRule = (s) => {
    ms = s;
  };
  fe.registerAtRule = (s) => {
    gs = s;
  };
  fe.registerRoot = (s) => {
    hn = s;
  };
  var ve = fe;
  fe.default = fe;
  fe.rebuild = (s) => {
    s.type === "atrule"
      ? Object.setPrototypeOf(s, gs.prototype)
      : s.type === "rule"
        ? Object.setPrototypeOf(s, ms.prototype)
        : s.type === "decl"
          ? Object.setPrototypeOf(s, ln.prototype)
          : s.type === "comment"
            ? Object.setPrototypeOf(s, un.prototype)
            : s.type === "root" && Object.setPrototypeOf(s, hn.prototype),
      (s[an] = !0),
      s.nodes &&
        s.nodes.forEach((e) => {
          fe.rebuild(e);
        });
  };
  let ol = ve,
    mn,
    gn,
    Ze = class extends ol {
      constructor(e) {
        super(x({ type: "document" }, e)), this.nodes || (this.nodes = []);
      }
      toResult(e = {}) {
        return new mn(new gn(), this, e).stringify();
      }
    };
  Ze.registerLazyResult = (s) => {
    mn = s;
  };
  Ze.registerProcessor = (s) => {
    gn = s;
  };
  var ys = Ze;
  Ze.default = Ze;
  let Br = class {
    constructor(e, t = {}) {
      if (((this.type = "warning"), (this.text = e), t.node && t.node.source)) {
        let r = t.node.rangeBy(t);
        (this.line = r.start.line),
          (this.column = r.start.column),
          (this.endLine = r.end.line),
          (this.endColumn = r.end.column);
      }
      for (let r in t) this[r] = t[r];
    }
    toString() {
      return this.node
        ? this.node.error(this.text, { index: this.index, plugin: this.plugin, word: this.word }).message
        : this.plugin
          ? this.plugin + ": " + this.text
          : this.text;
    }
  };
  var yn = Br;
  Br.default = Br;
  let al = yn,
    Wr = class {
      constructor(e, t, r) {
        (this.processor = e),
          (this.messages = []),
          (this.root = t),
          (this.opts = r),
          (this.css = void 0),
          (this.map = void 0);
      }
      toString() {
        return this.css;
      }
      warn(e, t = {}) {
        t.plugin || (this.lastPlugin && this.lastPlugin.postcssPlugin && (t.plugin = this.lastPlugin.postcssPlugin));
        let r = new al(e, t);
        return this.messages.push(r), r;
      }
      warnings() {
        return this.messages.filter((e) => e.type === "warning");
      }
      get content() {
        return this.css;
      }
    };
  var ws = Wr;
  Wr.default = Wr;
  const Cr = 39,
    ii = 34,
    mt = 92,
    ni = 47,
    gt = 10,
    Be = 32,
    yt = 12,
    wt = 9,
    St = 13,
    ll = 91,
    ul = 93,
    cl = 40,
    hl = 41,
    fl = 123,
    pl = 125,
    dl = 59,
    ml = 42,
    gl = 58,
    yl = 64,
    bt = /[\t\n\f\r "#'()/;[\\\]{}]/g,
    Ct = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
    wl = /.[\r\n"'(/\\]/,
    oi = /[\da-f]/i;
  var Sl = function (e, t = {}) {
    let r = e.css.valueOf(),
      i = t.ignoreErrors,
      n,
      o,
      l,
      a,
      u,
      c,
      h,
      m,
      d,
      g,
      p = r.length,
      f = 0,
      b = [],
      S = [];
    function y() {
      return f;
    }
    function C(M) {
      throw e.error("Unclosed " + M, f);
    }
    function k() {
      return S.length === 0 && f >= p;
    }
    function L(M) {
      if (S.length) return S.pop();
      if (f >= p) return;
      let j = M ? M.ignoreUnclosed : !1;
      switch (((n = r.charCodeAt(f)), n)) {
        case gt:
        case Be:
        case wt:
        case St:
        case yt: {
          o = f;
          do (o += 1), (n = r.charCodeAt(o));
          while (n === Be || n === gt || n === wt || n === St || n === yt);
          (g = ["space", r.slice(f, o)]), (f = o - 1);
          break;
        }
        case ll:
        case ul:
        case fl:
        case pl:
        case gl:
        case dl:
        case hl: {
          let H = String.fromCharCode(n);
          g = [H, H, f];
          break;
        }
        case cl: {
          if (
            ((m = b.length ? b.pop()[1] : ""),
            (d = r.charCodeAt(f + 1)),
            m === "url" && d !== Cr && d !== ii && d !== Be && d !== gt && d !== wt && d !== yt && d !== St)
          ) {
            o = f;
            do {
              if (((c = !1), (o = r.indexOf(")", o + 1)), o === -1))
                if (i || j) {
                  o = f;
                  break;
                } else C("bracket");
              for (h = o; r.charCodeAt(h - 1) === mt; ) (h -= 1), (c = !c);
            } while (c);
            (g = ["brackets", r.slice(f, o + 1), f, o]), (f = o);
          } else
            (o = r.indexOf(")", f + 1)),
              (a = r.slice(f, o + 1)),
              o === -1 || wl.test(a) ? (g = ["(", "(", f]) : ((g = ["brackets", a, f, o]), (f = o));
          break;
        }
        case Cr:
        case ii: {
          (l = n === Cr ? "'" : '"'), (o = f);
          do {
            if (((c = !1), (o = r.indexOf(l, o + 1)), o === -1))
              if (i || j) {
                o = f + 1;
                break;
              } else C("string");
            for (h = o; r.charCodeAt(h - 1) === mt; ) (h -= 1), (c = !c);
          } while (c);
          (g = ["string", r.slice(f, o + 1), f, o]), (f = o);
          break;
        }
        case yl: {
          (bt.lastIndex = f + 1),
            bt.test(r),
            bt.lastIndex === 0 ? (o = r.length - 1) : (o = bt.lastIndex - 2),
            (g = ["at-word", r.slice(f, o + 1), f, o]),
            (f = o);
          break;
        }
        case mt: {
          for (o = f, u = !0; r.charCodeAt(o + 1) === mt; ) (o += 1), (u = !u);
          if (
            ((n = r.charCodeAt(o + 1)),
            u &&
              n !== ni &&
              n !== Be &&
              n !== gt &&
              n !== wt &&
              n !== St &&
              n !== yt &&
              ((o += 1), oi.test(r.charAt(o))))
          ) {
            for (; oi.test(r.charAt(o + 1)); ) o += 1;
            r.charCodeAt(o + 1) === Be && (o += 1);
          }
          (g = ["word", r.slice(f, o + 1), f, o]), (f = o);
          break;
        }
        default: {
          n === ni && r.charCodeAt(f + 1) === ml
            ? ((o = r.indexOf("*/", f + 2) + 1),
              o === 0 && (i || j ? (o = r.length) : C("comment")),
              (g = ["comment", r.slice(f, o + 1), f, o]),
              (f = o))
            : ((Ct.lastIndex = f + 1),
              Ct.test(r),
              Ct.lastIndex === 0 ? (o = r.length - 1) : (o = Ct.lastIndex - 2),
              (g = ["word", r.slice(f, o + 1), f, o]),
              b.push(g),
              (f = o));
          break;
        }
      }
      return f++, g;
    }
    function V(M) {
      S.push(M);
    }
    return { back: V, endOfFile: k, nextToken: L, position: y };
  };
  let wn = ve,
    jt = class extends wn {
      constructor(e) {
        super(e), (this.type = "atrule");
      }
      append(...e) {
        return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
      }
      prepend(...e) {
        return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
      }
    };
  var Ss = jt;
  jt.default = jt;
  wn.registerAtRule(jt);
  let Sn = ve,
    bn,
    Cn,
    Ne = class extends Sn {
      constructor(e) {
        super(e), (this.type = "root"), this.nodes || (this.nodes = []);
      }
      normalize(e, t, r) {
        let i = super.normalize(e);
        if (t) {
          if (r === "prepend")
            this.nodes.length > 1 ? (t.raws.before = this.nodes[1].raws.before) : delete t.raws.before;
          else if (this.first !== t) for (let n of i) n.raws.before = t.raws.before;
        }
        return i;
      }
      removeChild(e, t) {
        let r = this.index(e);
        return (
          !t && r === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[r].raws.before),
          super.removeChild(e)
        );
      }
      toResult(e = {}) {
        return new bn(new Cn(), this, e).stringify();
      }
    };
  Ne.registerLazyResult = (s) => {
    bn = s;
  };
  Ne.registerProcessor = (s) => {
    Cn = s;
  };
  var it = Ne;
  Ne.default = Ne;
  Sn.registerRoot(Ne);
  let Je = {
    comma(s) {
      return Je.split(s, [","], !0);
    },
    space(s) {
      let e = [
        " ",
        `
`,
        "	",
      ];
      return Je.split(s, e);
    },
    split(s, e, t) {
      let r = [],
        i = "",
        n = !1,
        o = 0,
        l = !1,
        a = "",
        u = !1;
      for (let c of s)
        u
          ? (u = !1)
          : c === "\\"
            ? (u = !0)
            : l
              ? c === a && (l = !1)
              : c === '"' || c === "'"
                ? ((l = !0), (a = c))
                : c === "("
                  ? (o += 1)
                  : c === ")"
                    ? o > 0 && (o -= 1)
                    : o === 0 && e.includes(c) && (n = !0),
          n ? (i !== "" && r.push(i.trim()), (i = ""), (n = !1)) : (i += c);
      return (t || i !== "") && r.push(i.trim()), r;
    },
  };
  var vn = Je;
  Je.default = Je;
  let In = ve,
    bl = vn,
    Ht = class extends In {
      constructor(e) {
        super(e), (this.type = "rule"), this.nodes || (this.nodes = []);
      }
      get selectors() {
        return bl.comma(this.selector);
      }
      set selectors(e) {
        let t = this.selector ? this.selector.match(/,\s*/) : null,
          r = t ? t[0] : "," + this.raw("between", "beforeOpen");
        this.selector = e.join(r);
      }
    };
  var bs = Ht;
  Ht.default = Ht;
  In.registerRule(Ht);
  let Cl = sr,
    vl = Sl,
    Il = nr,
    xl = Ss,
    Ol = it,
    ai = bs;
  const li = { empty: !0, space: !0 };
  function Rl(s) {
    for (let e = s.length - 1; e >= 0; e--) {
      let t = s[e],
        r = t[3] || t[2];
      if (r) return r;
    }
  }
  let Ml = class {
    constructor(e) {
      (this.input = e),
        (this.root = new Ol()),
        (this.current = this.root),
        (this.spaces = ""),
        (this.semicolon = !1),
        this.createTokenizer(),
        (this.root.source = { input: e, start: { column: 1, line: 1, offset: 0 } });
    }
    atrule(e) {
      let t = new xl();
      (t.name = e[1].slice(1)), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
      let r,
        i,
        n,
        o = !1,
        l = !1,
        a = [],
        u = [];
      for (; !this.tokenizer.endOfFile(); ) {
        if (
          ((e = this.tokenizer.nextToken()),
          (r = e[0]),
          r === "(" || r === "["
            ? u.push(r === "(" ? ")" : "]")
            : r === "{" && u.length > 0
              ? u.push("}")
              : r === u[u.length - 1] && u.pop(),
          u.length === 0)
        )
          if (r === ";") {
            (t.source.end = this.getPosition(e[2])), t.source.end.offset++, (this.semicolon = !0);
            break;
          } else if (r === "{") {
            l = !0;
            break;
          } else if (r === "}") {
            if (a.length > 0) {
              for (n = a.length - 1, i = a[n]; i && i[0] === "space"; ) i = a[--n];
              i && ((t.source.end = this.getPosition(i[3] || i[2])), t.source.end.offset++);
            }
            this.end(e);
            break;
          } else a.push(e);
        else a.push(e);
        if (this.tokenizer.endOfFile()) {
          o = !0;
          break;
        }
      }
      (t.raws.between = this.spacesAndCommentsFromEnd(a)),
        a.length
          ? ((t.raws.afterName = this.spacesAndCommentsFromStart(a)),
            this.raw(t, "params", a),
            o &&
              ((e = a[a.length - 1]),
              (t.source.end = this.getPosition(e[3] || e[2])),
              t.source.end.offset++,
              (this.spaces = t.raws.between),
              (t.raws.between = "")))
          : ((t.raws.afterName = ""), (t.params = "")),
        l && ((t.nodes = []), (this.current = t));
    }
    checkMissedSemicolon(e) {
      let t = this.colon(e);
      if (t === !1) return;
      let r = 0,
        i;
      for (let n = t - 1; n >= 0 && ((i = e[n]), !(i[0] !== "space" && ((r += 1), r === 2))); n--);
      throw this.input.error("Missed semicolon", i[0] === "word" ? i[3] + 1 : i[2]);
    }
    colon(e) {
      let t = 0,
        r,
        i,
        n;
      for (let [o, l] of e.entries()) {
        if (((r = l), (i = r[0]), i === "(" && (t += 1), i === ")" && (t -= 1), t === 0 && i === ":"))
          if (!n) this.doubleColon(r);
          else {
            if (n[0] === "word" && n[1] === "progid") continue;
            return o;
          }
        n = r;
      }
      return !1;
    }
    comment(e) {
      let t = new Il();
      this.init(t, e[2]), (t.source.end = this.getPosition(e[3] || e[2])), t.source.end.offset++;
      let r = e[1].slice(2, -2);
      if (/^\s*$/.test(r)) (t.text = ""), (t.raws.left = r), (t.raws.right = "");
      else {
        let i = r.match(/^(\s*)([^]*\S)(\s*)$/);
        (t.text = i[2]), (t.raws.left = i[1]), (t.raws.right = i[3]);
      }
    }
    createTokenizer() {
      this.tokenizer = vl(this.input);
    }
    decl(e, t) {
      let r = new Cl();
      this.init(r, e[0][2]);
      let i = e[e.length - 1];
      for (
        i[0] === ";" && ((this.semicolon = !0), e.pop()),
          r.source.end = this.getPosition(i[3] || i[2] || Rl(e)),
          r.source.end.offset++;
        e[0][0] !== "word";

      )
        e.length === 1 && this.unknownWord(e), (r.raws.before += e.shift()[1]);
      for (r.source.start = this.getPosition(e[0][2]), r.prop = ""; e.length; ) {
        let u = e[0][0];
        if (u === ":" || u === "space" || u === "comment") break;
        r.prop += e.shift()[1];
      }
      r.raws.between = "";
      let n;
      for (; e.length; )
        if (((n = e.shift()), n[0] === ":")) {
          r.raws.between += n[1];
          break;
        } else n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]), (r.raws.between += n[1]);
      (r.prop[0] === "_" || r.prop[0] === "*") && ((r.raws.before += r.prop[0]), (r.prop = r.prop.slice(1)));
      let o = [],
        l;
      for (; e.length && ((l = e[0][0]), !(l !== "space" && l !== "comment")); ) o.push(e.shift());
      this.precheckMissedSemicolon(e);
      for (let u = e.length - 1; u >= 0; u--) {
        if (((n = e[u]), n[1].toLowerCase() === "!important")) {
          r.important = !0;
          let c = this.stringFrom(e, u);
          (c = this.spacesFromEnd(e) + c), c !== " !important" && (r.raws.important = c);
          break;
        } else if (n[1].toLowerCase() === "important") {
          let c = e.slice(0),
            h = "";
          for (let m = u; m > 0; m--) {
            let d = c[m][0];
            if (h.trim().indexOf("!") === 0 && d !== "space") break;
            h = c.pop()[1] + h;
          }
          h.trim().indexOf("!") === 0 && ((r.important = !0), (r.raws.important = h), (e = c));
        }
        if (n[0] !== "space" && n[0] !== "comment") break;
      }
      e.some((u) => u[0] !== "space" && u[0] !== "comment") &&
        ((r.raws.between += o.map((u) => u[1]).join("")), (o = [])),
        this.raw(r, "value", o.concat(e), t),
        r.value.includes(":") && !t && this.checkMissedSemicolon(e);
    }
    doubleColon(e) {
      throw this.input.error("Double colon", { offset: e[2] }, { offset: e[2] + e[1].length });
    }
    emptyRule(e) {
      let t = new ai();
      this.init(t, e[2]), (t.selector = ""), (t.raws.between = ""), (this.current = t);
    }
    end(e) {
      this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon),
        (this.semicolon = !1),
        (this.current.raws.after = (this.current.raws.after || "") + this.spaces),
        (this.spaces = ""),
        this.current.parent
          ? ((this.current.source.end = this.getPosition(e[2])),
            this.current.source.end.offset++,
            (this.current = this.current.parent))
          : this.unexpectedClose(e);
    }
    endFile() {
      this.current.parent && this.unclosedBlock(),
        this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon),
        (this.current.raws.after = (this.current.raws.after || "") + this.spaces),
        (this.root.source.end = this.getPosition(this.tokenizer.position()));
    }
    freeSemicolon(e) {
      if (((this.spaces += e[1]), this.current.nodes)) {
        let t = this.current.nodes[this.current.nodes.length - 1];
        t && t.type === "rule" && !t.raws.ownSemicolon && ((t.raws.ownSemicolon = this.spaces), (this.spaces = ""));
      }
    }
    getPosition(e) {
      let t = this.input.fromOffset(e);
      return { column: t.col, line: t.line, offset: e };
    }
    init(e, t) {
      this.current.push(e),
        (e.source = { input: this.input, start: this.getPosition(t) }),
        (e.raws.before = this.spaces),
        (this.spaces = ""),
        e.type !== "comment" && (this.semicolon = !1);
    }
    other(e) {
      let t = !1,
        r = null,
        i = !1,
        n = null,
        o = [],
        l = e[1].startsWith("--"),
        a = [],
        u = e;
      for (; u; ) {
        if (((r = u[0]), a.push(u), r === "(" || r === "[")) n || (n = u), o.push(r === "(" ? ")" : "]");
        else if (l && i && r === "{") n || (n = u), o.push("}");
        else if (o.length === 0)
          if (r === ";")
            if (i) {
              this.decl(a, l);
              return;
            } else break;
          else if (r === "{") {
            this.rule(a);
            return;
          } else if (r === "}") {
            this.tokenizer.back(a.pop()), (t = !0);
            break;
          } else r === ":" && (i = !0);
        else r === o[o.length - 1] && (o.pop(), o.length === 0 && (n = null));
        u = this.tokenizer.nextToken();
      }
      if ((this.tokenizer.endOfFile() && (t = !0), o.length > 0 && this.unclosedBracket(n), t && i)) {
        if (!l)
          for (; a.length && ((u = a[a.length - 1][0]), !(u !== "space" && u !== "comment")); )
            this.tokenizer.back(a.pop());
        this.decl(a, l);
      } else this.unknownWord(a);
    }
    parse() {
      let e;
      for (; !this.tokenizer.endOfFile(); )
        switch (((e = this.tokenizer.nextToken()), e[0])) {
          case "space":
            this.spaces += e[1];
            break;
          case ";":
            this.freeSemicolon(e);
            break;
          case "}":
            this.end(e);
            break;
          case "comment":
            this.comment(e);
            break;
          case "at-word":
            this.atrule(e);
            break;
          case "{":
            this.emptyRule(e);
            break;
          default:
            this.other(e);
            break;
        }
      this.endFile();
    }
    precheckMissedSemicolon() {}
    raw(e, t, r, i) {
      let n,
        o,
        l = r.length,
        a = "",
        u = !0,
        c,
        h;
      for (let m = 0; m < l; m += 1)
        (n = r[m]),
          (o = n[0]),
          o === "space" && m === l - 1 && !i
            ? (u = !1)
            : o === "comment"
              ? ((h = r[m - 1] ? r[m - 1][0] : "empty"),
                (c = r[m + 1] ? r[m + 1][0] : "empty"),
                !li[h] && !li[c] ? (a.slice(-1) === "," ? (u = !1) : (a += n[1])) : (u = !1))
              : (a += n[1]);
      if (!u) {
        let m = r.reduce((d, g) => d + g[1], "");
        e.raws[t] = { raw: m, value: a };
      }
      e[t] = a;
    }
    rule(e) {
      e.pop();
      let t = new ai();
      this.init(t, e[0][2]),
        (t.raws.between = this.spacesAndCommentsFromEnd(e)),
        this.raw(t, "selector", e),
        (this.current = t);
    }
    spacesAndCommentsFromEnd(e) {
      let t,
        r = "";
      for (; e.length && ((t = e[e.length - 1][0]), !(t !== "space" && t !== "comment")); ) r = e.pop()[1] + r;
      return r;
    }
    spacesAndCommentsFromStart(e) {
      let t,
        r = "";
      for (; e.length && ((t = e[0][0]), !(t !== "space" && t !== "comment")); ) r += e.shift()[1];
      return r;
    }
    spacesFromEnd(e) {
      let t,
        r = "";
      for (; e.length && ((t = e[e.length - 1][0]), t === "space"); ) r = e.pop()[1] + r;
      return r;
    }
    stringFrom(e, t) {
      let r = "";
      for (let i = t; i < e.length; i++) r += e[i][1];
      return e.splice(t, e.length - t), r;
    }
    unclosedBlock() {
      let e = this.current.source.start;
      throw this.input.error("Unclosed block", e.line, e.column);
    }
    unclosedBracket(e) {
      throw this.input.error("Unclosed bracket", { offset: e[2] }, { offset: e[2] + 1 });
    }
    unexpectedClose(e) {
      throw this.input.error("Unexpected }", { offset: e[2] }, { offset: e[2] + 1 });
    }
    unknownWord(e) {
      throw this.input.error("Unknown word", { offset: e[0][2] }, { offset: e[0][2] + e[0][1].length });
    }
    unnamedAtrule(e, t) {
      throw this.input.error("At-rule without name", { offset: t[2] }, { offset: t[2] + t[1].length });
    }
  };
  var Al = Ml;
  let El = ve,
    $l = Al,
    Nl = ir;
  function Yt(s, e) {
    let t = new Nl(s, e),
      r = new $l(t);
    try {
      r.parse();
    } catch (i) {
      throw i;
    }
    return r.root;
  }
  var Cs = Yt;
  Yt.default = Yt;
  El.registerParse(Yt);
  let { isClean: le, my: kl } = st,
    Pl = nn,
    Dl = tr,
    Ll = ve,
    Tl = ys;
  let ui = ws,
    _l = Cs,
    Fl = it;
  const Ul = {
      atrule: "AtRule",
      comment: "Comment",
      decl: "Declaration",
      document: "Document",
      root: "Root",
      rule: "Rule",
    },
    Bl = {
      AtRule: !0,
      AtRuleExit: !0,
      Comment: !0,
      CommentExit: !0,
      Declaration: !0,
      DeclarationExit: !0,
      Document: !0,
      DocumentExit: !0,
      Once: !0,
      OnceExit: !0,
      postcssPlugin: !0,
      prepare: !0,
      Root: !0,
      RootExit: !0,
      Rule: !0,
      RuleExit: !0,
    },
    Wl = { Once: !0, postcssPlugin: !0, prepare: !0 },
    ke = 0;
  function We(s) {
    return typeof s == "object" && typeof s.then == "function";
  }
  function xn(s) {
    let e = !1,
      t = Ul[s.type];
    return (
      s.type === "decl" ? (e = s.prop.toLowerCase()) : s.type === "atrule" && (e = s.name.toLowerCase()),
      e && s.append
        ? [t, t + "-" + e, ke, t + "Exit", t + "Exit-" + e]
        : e
          ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e]
          : s.append
            ? [t, ke, t + "Exit"]
            : [t, t + "Exit"]
    );
  }
  function ci(s) {
    let e;
    return (
      s.type === "document"
        ? (e = ["Document", ke, "DocumentExit"])
        : s.type === "root"
          ? (e = ["Root", ke, "RootExit"])
          : (e = xn(s)),
      { eventIndex: 0, events: e, iterator: 0, node: s, visitorIndex: 0, visitors: [] }
    );
  }
  function zr(s) {
    return (s[le] = !1), s.nodes && s.nodes.forEach((e) => zr(e)), s;
  }
  let Gr = {},
    Pe = class On {
      constructor(e, t, r) {
        (this.stringified = !1), (this.processed = !1);
        let i;
        if (typeof t == "object" && t !== null && (t.type === "root" || t.type === "document")) i = zr(t);
        else if (t instanceof On || t instanceof ui)
          (i = zr(t.root)),
            t.map &&
              (typeof r.map == "undefined" && (r.map = {}), r.map.inline || (r.map.inline = !1), (r.map.prev = t.map));
        else {
          let n = _l;
          r.syntax && (n = r.syntax.parse), r.parser && (n = r.parser), n.parse && (n = n.parse);
          try {
            i = n(t, r);
          } catch (o) {
            (this.processed = !0), (this.error = o);
          }
          i && !i[kl] && Ll.rebuild(i);
        }
        (this.result = new ui(e, i, r)),
          (this.helpers = q(x({}, Gr), { postcss: Gr, result: this.result })),
          (this.plugins = this.processor.plugins.map((n) =>
            typeof n == "object" && n.prepare ? x(x({}, n), n.prepare(this.result)) : n,
          ));
      }
      async() {
        return this.error
          ? Promise.reject(this.error)
          : this.processed
            ? Promise.resolve(this.result)
            : (this.processing || (this.processing = this.runAsync()), this.processing);
      }
      catch(e) {
        return this.async().catch(e);
      }
      finally(e) {
        return this.async().then(e, e);
      }
      getAsyncError() {
        throw new Error("Use process(css).then(cb) to work with async plugins");
      }
      handleError(e, t) {
        let r = this.result.lastPlugin;
        try {
          t && t.addToError(e),
            (this.error = e),
            e.name === "CssSyntaxError" && !e.plugin
              ? ((e.plugin = r.postcssPlugin), e.setMessage())
              : r.postcssVersion;
        } catch (i) {
          console && console.error && console.error(i);
        }
        return e;
      }
      prepareVisitors() {
        this.listeners = {};
        let e = (t, r, i) => {
          this.listeners[r] || (this.listeners[r] = []), this.listeners[r].push([t, i]);
        };
        for (let t of this.plugins)
          if (typeof t == "object")
            for (let r in t) {
              if (!Bl[r] && /^[A-Z]/.test(r))
                throw new Error(
                  `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`,
                );
              if (!Wl[r])
                if (typeof t[r] == "object")
                  for (let i in t[r]) i === "*" ? e(t, r, t[r][i]) : e(t, r + "-" + i.toLowerCase(), t[r][i]);
                else typeof t[r] == "function" && e(t, r, t[r]);
            }
        this.hasListener = Object.keys(this.listeners).length > 0;
      }
      async runAsync() {
        this.plugin = 0;
        for (let e = 0; e < this.plugins.length; e++) {
          let t = this.plugins[e],
            r = this.runOnRoot(t);
          if (We(r))
            try {
              await r;
            } catch (i) {
              throw this.handleError(i);
            }
        }
        if ((this.prepareVisitors(), this.hasListener)) {
          let e = this.result.root;
          for (; !e[le]; ) {
            e[le] = !0;
            let t = [ci(e)];
            for (; t.length > 0; ) {
              let r = this.visitTick(t);
              if (We(r))
                try {
                  await r;
                } catch (i) {
                  let n = t[t.length - 1].node;
                  throw this.handleError(i, n);
                }
            }
          }
          if (this.listeners.OnceExit)
            for (let [t, r] of this.listeners.OnceExit) {
              this.result.lastPlugin = t;
              try {
                if (e.type === "document") {
                  let i = e.nodes.map((n) => r(n, this.helpers));
                  await Promise.all(i);
                } else await r(e, this.helpers);
              } catch (i) {
                throw this.handleError(i);
              }
            }
        }
        return (this.processed = !0), this.stringify();
      }
      runOnRoot(e) {
        this.result.lastPlugin = e;
        try {
          if (typeof e == "object" && e.Once) {
            if (this.result.root.type === "document") {
              let t = this.result.root.nodes.map((r) => e.Once(r, this.helpers));
              return We(t[0]) ? Promise.all(t) : t;
            }
            return e.Once(this.result.root, this.helpers);
          } else if (typeof e == "function") return e(this.result.root, this.result);
        } catch (t) {
          throw this.handleError(t);
        }
      }
      stringify() {
        if (this.error) throw this.error;
        if (this.stringified) return this.result;
        (this.stringified = !0), this.sync();
        let e = this.result.opts,
          t = Dl;
        e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
        let i = new Pl(t, this.result.root, this.result.opts).generate();
        return (this.result.css = i[0]), (this.result.map = i[1]), this.result;
      }
      sync() {
        if (this.error) throw this.error;
        if (this.processed) return this.result;
        if (((this.processed = !0), this.processing)) throw this.getAsyncError();
        for (let e of this.plugins) {
          let t = this.runOnRoot(e);
          if (We(t)) throw this.getAsyncError();
        }
        if ((this.prepareVisitors(), this.hasListener)) {
          let e = this.result.root;
          for (; !e[le]; ) (e[le] = !0), this.walkSync(e);
          if (this.listeners.OnceExit)
            if (e.type === "document") for (let t of e.nodes) this.visitSync(this.listeners.OnceExit, t);
            else this.visitSync(this.listeners.OnceExit, e);
        }
        return this.result;
      }
      then(e, t) {
        return this.async().then(e, t);
      }
      toString() {
        return this.css;
      }
      visitSync(e, t) {
        for (let [r, i] of e) {
          this.result.lastPlugin = r;
          let n;
          try {
            n = i(t, this.helpers);
          } catch (o) {
            throw this.handleError(o, t.proxyOf);
          }
          if (t.type !== "root" && t.type !== "document" && !t.parent) return !0;
          if (We(n)) throw this.getAsyncError();
        }
      }
      visitTick(e) {
        let t = e[e.length - 1],
          { node: r, visitors: i } = t;
        if (r.type !== "root" && r.type !== "document" && !r.parent) {
          e.pop();
          return;
        }
        if (i.length > 0 && t.visitorIndex < i.length) {
          let [o, l] = i[t.visitorIndex];
          (t.visitorIndex += 1),
            t.visitorIndex === i.length && ((t.visitors = []), (t.visitorIndex = 0)),
            (this.result.lastPlugin = o);
          try {
            return l(r.toProxy(), this.helpers);
          } catch (a) {
            throw this.handleError(a, r);
          }
        }
        if (t.iterator !== 0) {
          let o = t.iterator,
            l;
          for (; (l = r.nodes[r.indexes[o]]); )
            if (((r.indexes[o] += 1), !l[le])) {
              (l[le] = !0), e.push(ci(l));
              return;
            }
          (t.iterator = 0), delete r.indexes[o];
        }
        let n = t.events;
        for (; t.eventIndex < n.length; ) {
          let o = n[t.eventIndex];
          if (((t.eventIndex += 1), o === ke)) {
            r.nodes && r.nodes.length && ((r[le] = !0), (t.iterator = r.getIterator()));
            return;
          } else if (this.listeners[o]) {
            t.visitors = this.listeners[o];
            return;
          }
        }
        e.pop();
      }
      walkSync(e) {
        e[le] = !0;
        let t = xn(e);
        for (let r of t)
          if (r === ke)
            e.nodes &&
              e.each((i) => {
                i[le] || this.walkSync(i);
              });
          else {
            let i = this.listeners[r];
            if (i && this.visitSync(i, e.toProxy())) return;
          }
      }
      warnings() {
        return this.sync().warnings();
      }
      get content() {
        return this.stringify().content;
      }
      get css() {
        return this.stringify().css;
      }
      get map() {
        return this.stringify().map;
      }
      get messages() {
        return this.sync().messages;
      }
      get opts() {
        return this.result.opts;
      }
      get processor() {
        return this.result.processor;
      }
      get root() {
        return this.sync().root;
      }
      get [Symbol.toStringTag]() {
        return "LazyResult";
      }
    };
  Pe.registerPostcss = (s) => {
    Gr = s;
  };
  var Rn = Pe;
  Pe.default = Pe;
  Fl.registerLazyResult(Pe);
  Tl.registerLazyResult(Pe);
  let zl = nn,
    Gl = tr;
  let Vl = Cs;
  const jl = ws;
  let Vr = class {
    constructor(e, t, r) {
      (t = t.toString()),
        (this.stringified = !1),
        (this._processor = e),
        (this._css = t),
        (this._opts = r),
        (this._map = void 0);
      let i,
        n = Gl;
      (this.result = new jl(this._processor, i, this._opts)), (this.result.css = t);
      let o = this;
      Object.defineProperty(this.result, "root", {
        get() {
          return o.root;
        },
      });
      let l = new zl(n, i, this._opts, t);
      if (l.isMap()) {
        let [a, u] = l.generate();
        a && (this.result.css = a), u && (this.result.map = u);
      } else l.clearAnnotation(), (this.result.css = l.css);
    }
    async() {
      return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
    }
    catch(e) {
      return this.async().catch(e);
    }
    finally(e) {
      return this.async().then(e, e);
    }
    sync() {
      if (this.error) throw this.error;
      return this.result;
    }
    then(e, t) {
      return this.async().then(e, t);
    }
    toString() {
      return this._css;
    }
    warnings() {
      return [];
    }
    get content() {
      return this.result.css;
    }
    get css() {
      return this.result.css;
    }
    get map() {
      return this.result.map;
    }
    get messages() {
      return [];
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      if (this._root) return this._root;
      let e,
        t = Vl;
      try {
        e = t(this._css, this._opts);
      } catch (r) {
        this.error = r;
      }
      if (this.error) throw this.error;
      return (this._root = e), e;
    }
    get [Symbol.toStringTag]() {
      return "NoWorkResult";
    }
  };
  var Hl = Vr;
  Vr.default = Vr;
  let Yl = Hl,
    Zl = Rn,
    Jl = ys,
    Xl = it,
    Xe = class {
      constructor(e = []) {
        (this.version = "8.4.38"), (this.plugins = this.normalize(e));
      }
      normalize(e) {
        let t = [];
        for (let r of e)
          if (
            (r.postcss === !0 ? (r = r()) : r.postcss && (r = r.postcss),
            typeof r == "object" && Array.isArray(r.plugins))
          )
            t = t.concat(r.plugins);
          else if (typeof r == "object" && r.postcssPlugin) t.push(r);
          else if (typeof r == "function") t.push(r);
          else if (!(typeof r == "object" && (r.parse || r.stringify))) throw new Error(r + " is not a PostCSS plugin");
        return t;
      }
      process(e, t = {}) {
        return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax
          ? new Yl(this, e, t)
          : new Zl(this, e, t);
      }
      use(e) {
        return (this.plugins = this.plugins.concat(this.normalize([e]))), this;
      }
    };
  var Kl = Xe;
  Xe.default = Xe;
  Xl.registerProcessor(Xe);
  Jl.registerProcessor(Xe);
  let Ql = sr,
    ql = qi,
    eu = nr,
    tu = Ss,
    ru = ir,
    su = it,
    iu = bs;
  function Ke(s, e) {
    if (Array.isArray(s)) return s.map((o) => Ke(o));
    let i = s,
      { inputs: t } = i,
      r = xe(i, ["inputs"]);
    if (t) {
      e = [];
      for (let o of t) {
        let l = q(x({}, o), { __proto__: ru.prototype });
        l.map && (l.map = q(x({}, l.map), { __proto__: ql.prototype })), e.push(l);
      }
    }
    if ((r.nodes && (r.nodes = s.nodes.map((o) => Ke(o, e))), r.source)) {
      let n = r.source,
        { inputId: o } = n,
        l = xe(n, ["inputId"]);
      (r.source = l), o != null && (r.source.input = e[o]);
    }
    if (r.type === "root") return new su(r);
    if (r.type === "decl") return new Ql(r);
    if (r.type === "rule") return new iu(r);
    if (r.type === "comment") return new eu(r);
    if (r.type === "atrule") return new tu(r);
    throw new Error("Unknown node type: " + s.type);
  }
  var nu = Ke;
  Ke.default = Ke;
  let ou = ds,
    Mn = sr,
    au = Rn,
    lu = ve,
    vs = Kl,
    uu = tr,
    cu = nu,
    An = ys,
    hu = yn,
    En = nr,
    $n = Ss,
    fu = ws,
    pu = ir,
    du = Cs,
    mu = vn,
    Nn = bs,
    kn = it,
    gu = rr;
  function $(...s) {
    return s.length === 1 && Array.isArray(s[0]) && (s = s[0]), new vs(s);
  }
  $.plugin = function (e, t) {
    let r = !1;
    function i(...o) {
      console &&
        console.warn &&
        !r &&
        ((r = !0),
        console.warn(
          e +
            `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`,
        ),
        process.env.LANG &&
          process.env.LANG.startsWith("cn") &&
          console.warn(
            e +
              `: \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:
https://www.w3ctech.com/topic/2226`,
          ));
      let l = t(...o);
      return (l.postcssPlugin = e), (l.postcssVersion = new vs().version), l;
    }
    let n;
    return (
      Object.defineProperty(i, "postcss", {
        get() {
          return n || (n = i()), n;
        },
      }),
      (i.process = function (o, l, a) {
        return $([i(a)]).process(o, l);
      }),
      i
    );
  };
  $.stringify = uu;
  $.parse = du;
  $.fromJSON = cu;
  $.list = mu;
  $.comment = (s) => new En(s);
  $.atRule = (s) => new $n(s);
  $.decl = (s) => new Mn(s);
  $.rule = (s) => new Nn(s);
  $.root = (s) => new kn(s);
  $.document = (s) => new An(s);
  $.CssSyntaxError = ou;
  $.Declaration = Mn;
  $.Container = lu;
  $.Processor = vs;
  $.Document = An;
  $.Comment = En;
  $.Warning = hu;
  $.AtRule = $n;
  $.Result = fu;
  $.Input = pu;
  $.Rule = Nn;
  $.Root = kn;
  $.Node = gu;
  au.registerPostcss($);
  var yu = $;
  $.default = $;
  const F = Ea(yu);
  F.stringify;
  F.fromJSON;
  F.plugin;
  F.parse;
  F.list;
  F.document;
  F.comment;
  F.atRule;
  F.rule;
  F.decl;
  F.root;
  F.CssSyntaxError;
  F.Declaration;
  F.Container;
  F.Processor;
  F.Document;
  F.Comment;
  F.Warning;
  F.AtRule;
  F.Result;
  F.Input;
  F.Rule;
  F.Root;
  F.Node;
  var wu = Object.defineProperty,
    Su = (s, e, t) => (e in s ? wu(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t)),
    ee = (s, e, t) => Su(s, typeof e != "symbol" ? e + "" : e, t);
  function bu(s) {
    return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
  }
  function Cu(s) {
    if (s.__esModule) return s;
    var e = s.default;
    if (typeof e == "function") {
      var t = function r() {
        return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
      };
      t.prototype = e.prototype;
    } else t = {};
    return (
      Object.defineProperty(t, "__esModule", { value: !0 }),
      Object.keys(s).forEach(function (r) {
        var i = Object.getOwnPropertyDescriptor(s, r);
        Object.defineProperty(
          t,
          r,
          i.get
            ? i
            : {
                enumerable: !0,
                get: function () {
                  return s[r];
                },
              },
        );
      }),
      t
    );
  }
  var Is = { exports: {} },
    _ = String,
    Pn = function () {
      return {
        isColorSupported: !1,
        reset: _,
        bold: _,
        dim: _,
        italic: _,
        underline: _,
        inverse: _,
        hidden: _,
        strikethrough: _,
        black: _,
        red: _,
        green: _,
        yellow: _,
        blue: _,
        magenta: _,
        cyan: _,
        white: _,
        gray: _,
        bgBlack: _,
        bgRed: _,
        bgGreen: _,
        bgYellow: _,
        bgBlue: _,
        bgMagenta: _,
        bgCyan: _,
        bgWhite: _,
      };
    };
  Is.exports = Pn();
  Is.exports.createColors = Pn;
  var vu = Is.exports;
  const Iu = {},
    xu = Object.freeze(
      Object.defineProperty({ __proto__: null, default: Iu }, Symbol.toStringTag, { value: "Module" }),
    ),
    ne = Cu(xu);
  let hi = vu,
    fi = ne,
    jr = class Dn extends Error {
      constructor(e, t, r, i, n, o) {
        super(e),
          (this.name = "CssSyntaxError"),
          (this.reason = e),
          n && (this.file = n),
          i && (this.source = i),
          o && (this.plugin = o),
          typeof t != "undefined" &&
            typeof r != "undefined" &&
            (typeof t == "number"
              ? ((this.line = t), (this.column = r))
              : ((this.line = t.line), (this.column = t.column), (this.endLine = r.line), (this.endColumn = r.column))),
          this.setMessage(),
          Error.captureStackTrace && Error.captureStackTrace(this, Dn);
      }
      setMessage() {
        (this.message = this.plugin ? this.plugin + ": " : ""),
          (this.message += this.file ? this.file : "<css input>"),
          typeof this.line != "undefined" && (this.message += ":" + this.line + ":" + this.column),
          (this.message += ": " + this.reason);
      }
      showSourceCode(e) {
        if (!this.source) return "";
        let t = this.source;
        e == null && (e = hi.isColorSupported), fi && e && (t = fi(t));
        let r = t.split(/\r?\n/),
          i = Math.max(this.line - 3, 0),
          n = Math.min(this.line + 2, r.length),
          o = String(n).length,
          l,
          a;
        if (e) {
          let { bold: u, gray: c, red: h } = hi.createColors(!0);
          (l = (m) => u(h(m))), (a = (m) => c(m));
        } else l = a = (u) => u;
        return r.slice(i, n).map((u, c) => {
          let h = i + 1 + c,
            m = " " + (" " + h).slice(-o) + " | ";
          if (h === this.line) {
            let d = a(m.replace(/\d/g, " ")) + u.slice(0, this.column - 1).replace(/[^\t]/g, " ");
            return (
              l(">") +
              a(m) +
              u +
              `
 ` +
              d +
              l("^")
            );
          }
          return " " + a(m) + u;
        }).join(`
`);
      }
      toString() {
        let e = this.showSourceCode();
        return (
          e &&
            (e =
              `

` +
              e +
              `
`),
          this.name + ": " + this.message + e
        );
      }
    };
  var xs = jr;
  jr.default = jr;
  var nt = {};
  nt.isClean = Symbol("isClean");
  nt.my = Symbol("my");
  const pi = {
    after: `
`,
    beforeClose: `
`,
    beforeComment: `
`,
    beforeDecl: `
`,
    beforeOpen: " ",
    beforeRule: `
`,
    colon: ": ",
    commentLeft: " ",
    commentRight: " ",
    emptyBody: "",
    indent: "    ",
    semicolon: !1,
  };
  function Ou(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  let Hr = class {
    constructor(e) {
      this.builder = e;
    }
    atrule(e, t) {
      let r = "@" + e.name,
        i = e.params ? this.rawValue(e, "params") : "";
      if ((typeof e.raws.afterName != "undefined" ? (r += e.raws.afterName) : i && (r += " "), e.nodes))
        this.block(e, r + i);
      else {
        let n = (e.raws.between || "") + (t ? ";" : "");
        this.builder(r + i + n, e);
      }
    }
    beforeAfter(e, t) {
      let r;
      e.type === "decl"
        ? (r = this.raw(e, null, "beforeDecl"))
        : e.type === "comment"
          ? (r = this.raw(e, null, "beforeComment"))
          : t === "before"
            ? (r = this.raw(e, null, "beforeRule"))
            : (r = this.raw(e, null, "beforeClose"));
      let i = e.parent,
        n = 0;
      for (; i && i.type !== "root"; ) (n += 1), (i = i.parent);
      if (
        r.includes(`
`)
      ) {
        let o = this.raw(e, null, "indent");
        if (o.length) for (let l = 0; l < n; l++) r += o;
      }
      return r;
    }
    block(e, t) {
      let r = this.raw(e, "between", "beforeOpen");
      this.builder(t + r + "{", e, "start");
      let i;
      e.nodes && e.nodes.length ? (this.body(e), (i = this.raw(e, "after"))) : (i = this.raw(e, "after", "emptyBody")),
        i && this.builder(i),
        this.builder("}", e, "end");
    }
    body(e) {
      let t = e.nodes.length - 1;
      for (; t > 0 && e.nodes[t].type === "comment"; ) t -= 1;
      let r = this.raw(e, "semicolon");
      for (let i = 0; i < e.nodes.length; i++) {
        let n = e.nodes[i],
          o = this.raw(n, "before");
        o && this.builder(o), this.stringify(n, t !== i || r);
      }
    }
    comment(e) {
      let t = this.raw(e, "left", "commentLeft"),
        r = this.raw(e, "right", "commentRight");
      this.builder("/*" + t + e.text + r + "*/", e);
    }
    decl(e, t) {
      let r = this.raw(e, "between", "colon"),
        i = e.prop + r + this.rawValue(e, "value");
      e.important && (i += e.raws.important || " !important"), t && (i += ";"), this.builder(i, e);
    }
    document(e) {
      this.body(e);
    }
    raw(e, t, r) {
      let i;
      if ((r || (r = t), t && ((i = e.raws[t]), typeof i != "undefined"))) return i;
      let n = e.parent;
      if (r === "before" && (!n || (n.type === "root" && n.first === e) || (n && n.type === "document"))) return "";
      if (!n) return pi[r];
      let o = e.root();
      if ((o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] != "undefined")) return o.rawCache[r];
      if (r === "before" || r === "after") return this.beforeAfter(e, r);
      {
        let l = "raw" + Ou(r);
        this[l]
          ? (i = this[l](o, e))
          : o.walk((a) => {
              if (((i = a.raws[t]), typeof i != "undefined")) return !1;
            });
      }
      return typeof i == "undefined" && (i = pi[r]), (o.rawCache[r] = i), i;
    }
    rawBeforeClose(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.nodes && r.nodes.length > 0 && typeof r.raws.after != "undefined")
            return (
              (t = r.raws.after),
              t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        t && (t = t.replace(/\S/g, "")),
        t
      );
    }
    rawBeforeComment(e, t) {
      let r;
      return (
        e.walkComments((i) => {
          if (typeof i.raws.before != "undefined")
            return (
              (r = i.raws.before),
              r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        typeof r == "undefined" ? (r = this.raw(t, null, "beforeDecl")) : r && (r = r.replace(/\S/g, "")),
        r
      );
    }
    rawBeforeDecl(e, t) {
      let r;
      return (
        e.walkDecls((i) => {
          if (typeof i.raws.before != "undefined")
            return (
              (r = i.raws.before),
              r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        typeof r == "undefined" ? (r = this.raw(t, null, "beforeRule")) : r && (r = r.replace(/\S/g, "")),
        r
      );
    }
    rawBeforeOpen(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.type !== "decl" && ((t = r.raws.between), typeof t != "undefined")) return !1;
        }),
        t
      );
    }
    rawBeforeRule(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.nodes && (r.parent !== e || e.first !== r) && typeof r.raws.before != "undefined")
            return (
              (t = r.raws.before),
              t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")),
              !1
            );
        }),
        t && (t = t.replace(/\S/g, "")),
        t
      );
    }
    rawColon(e) {
      let t;
      return (
        e.walkDecls((r) => {
          if (typeof r.raws.between != "undefined") return (t = r.raws.between.replace(/[^\s:]/g, "")), !1;
        }),
        t
      );
    }
    rawEmptyBody(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.nodes && r.nodes.length === 0 && ((t = r.raws.after), typeof t != "undefined")) return !1;
        }),
        t
      );
    }
    rawIndent(e) {
      if (e.raws.indent) return e.raws.indent;
      let t;
      return (
        e.walk((r) => {
          let i = r.parent;
          if (i && i !== e && i.parent && i.parent === e && typeof r.raws.before != "undefined") {
            let n = r.raws.before.split(`
`);
            return (t = n[n.length - 1]), (t = t.replace(/\S/g, "")), !1;
          }
        }),
        t
      );
    }
    rawSemicolon(e) {
      let t;
      return (
        e.walk((r) => {
          if (r.nodes && r.nodes.length && r.last.type === "decl" && ((t = r.raws.semicolon), typeof t != "undefined"))
            return !1;
        }),
        t
      );
    }
    rawValue(e, t) {
      let r = e[t],
        i = e.raws[t];
      return i && i.value === r ? i.raw : r;
    }
    root(e) {
      this.body(e), e.raws.after && this.builder(e.raws.after);
    }
    rule(e) {
      this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
    }
    stringify(e, t) {
      if (!this[e.type])
        throw new Error("Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier.");
      this[e.type](e, t);
    }
  };
  var Ln = Hr;
  Hr.default = Hr;
  let Ru = Ln;
  function Yr(s, e) {
    new Ru(e).stringify(s);
  }
  var or = Yr;
  Yr.default = Yr;
  let { isClean: vt, my: Mu } = nt,
    Au = xs,
    Eu = Ln,
    $u = or;
  function Zr(s, e) {
    let t = new s.constructor();
    for (let r in s) {
      if (!Object.prototype.hasOwnProperty.call(s, r) || r === "proxyCache") continue;
      let i = s[r],
        n = typeof i;
      r === "parent" && n === "object"
        ? e && (t[r] = e)
        : r === "source"
          ? (t[r] = i)
          : Array.isArray(i)
            ? (t[r] = i.map((o) => Zr(o, t)))
            : (n === "object" && i !== null && (i = Zr(i)), (t[r] = i));
    }
    return t;
  }
  let Jr = class {
    constructor(e = {}) {
      (this.raws = {}), (this[vt] = !1), (this[Mu] = !0);
      for (let t in e)
        if (t === "nodes") {
          this.nodes = [];
          for (let r of e[t]) typeof r.clone == "function" ? this.append(r.clone()) : this.append(r);
        } else this[t] = e[t];
    }
    addToError(e) {
      if (((e.postcssNode = this), e.stack && this.source && /\n\s{4}at /.test(e.stack))) {
        let t = this.source;
        e.stack = e.stack.replace(/\n\s{4}at /, `$&${t.input.from}:${t.start.line}:${t.start.column}$&`);
      }
      return e;
    }
    after(e) {
      return this.parent.insertAfter(this, e), this;
    }
    assign(e = {}) {
      for (let t in e) this[t] = e[t];
      return this;
    }
    before(e) {
      return this.parent.insertBefore(this, e), this;
    }
    cleanRaws(e) {
      delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
    }
    clone(e = {}) {
      let t = Zr(this);
      for (let r in e) t[r] = e[r];
      return t;
    }
    cloneAfter(e = {}) {
      let t = this.clone(e);
      return this.parent.insertAfter(this, t), t;
    }
    cloneBefore(e = {}) {
      let t = this.clone(e);
      return this.parent.insertBefore(this, t), t;
    }
    error(e, t = {}) {
      if (this.source) {
        let { end: r, start: i } = this.rangeBy(t);
        return this.source.input.error(e, { column: i.column, line: i.line }, { column: r.column, line: r.line }, t);
      }
      return new Au(e);
    }
    getProxyProcessor() {
      return {
        get(e, t) {
          return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
        },
        set(e, t, r) {
          return (
            e[t] === r ||
              ((e[t] = r),
              (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || t === "text") &&
                e.markDirty()),
            !0
          );
        },
      };
    }
    markDirty() {
      if (this[vt]) {
        this[vt] = !1;
        let e = this;
        for (; (e = e.parent); ) e[vt] = !1;
      }
    }
    next() {
      if (!this.parent) return;
      let e = this.parent.index(this);
      return this.parent.nodes[e + 1];
    }
    positionBy(e, t) {
      let r = this.source.start;
      if (e.index) r = this.positionInside(e.index, t);
      else if (e.word) {
        t = this.toString();
        let i = t.indexOf(e.word);
        i !== -1 && (r = this.positionInside(i, t));
      }
      return r;
    }
    positionInside(e, t) {
      let r = t || this.toString(),
        i = this.source.start.column,
        n = this.source.start.line;
      for (let o = 0; o < e; o++)
        r[o] ===
        `
`
          ? ((i = 1), (n += 1))
          : (i += 1);
      return { column: i, line: n };
    }
    prev() {
      if (!this.parent) return;
      let e = this.parent.index(this);
      return this.parent.nodes[e - 1];
    }
    rangeBy(e) {
      let t = { column: this.source.start.column, line: this.source.start.line },
        r = this.source.end
          ? { column: this.source.end.column + 1, line: this.source.end.line }
          : { column: t.column + 1, line: t.line };
      if (e.word) {
        let i = this.toString(),
          n = i.indexOf(e.word);
        n !== -1 && ((t = this.positionInside(n, i)), (r = this.positionInside(n + e.word.length, i)));
      } else
        e.start ? (t = { column: e.start.column, line: e.start.line }) : e.index && (t = this.positionInside(e.index)),
          e.end
            ? (r = { column: e.end.column, line: e.end.line })
            : typeof e.endIndex == "number"
              ? (r = this.positionInside(e.endIndex))
              : e.index && (r = this.positionInside(e.index + 1));
      return (
        (r.line < t.line || (r.line === t.line && r.column <= t.column)) &&
          (r = { column: t.column + 1, line: t.line }),
        { end: r, start: t }
      );
    }
    raw(e, t) {
      return new Eu().raw(this, e, t);
    }
    remove() {
      return this.parent && this.parent.removeChild(this), (this.parent = void 0), this;
    }
    replaceWith(...e) {
      if (this.parent) {
        let t = this,
          r = !1;
        for (let i of e)
          i === this ? (r = !0) : r ? (this.parent.insertAfter(t, i), (t = i)) : this.parent.insertBefore(t, i);
        r || this.remove();
      }
      return this;
    }
    root() {
      let e = this;
      for (; e.parent && e.parent.type !== "document"; ) e = e.parent;
      return e;
    }
    toJSON(e, t) {
      let r = {},
        i = t == null;
      t = t || new Map();
      let n = 0;
      for (let o in this) {
        if (!Object.prototype.hasOwnProperty.call(this, o) || o === "parent" || o === "proxyCache") continue;
        let l = this[o];
        if (Array.isArray(l)) r[o] = l.map((a) => (typeof a == "object" && a.toJSON ? a.toJSON(null, t) : a));
        else if (typeof l == "object" && l.toJSON) r[o] = l.toJSON(null, t);
        else if (o === "source") {
          let a = t.get(l.input);
          a == null && ((a = n), t.set(l.input, n), n++), (r[o] = { end: l.end, inputId: a, start: l.start });
        } else r[o] = l;
      }
      return i && (r.inputs = [...t.keys()].map((o) => o.toJSON())), r;
    }
    toProxy() {
      return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
    }
    toString(e = $u) {
      e.stringify && (e = e.stringify);
      let t = "";
      return (
        e(this, (r) => {
          t += r;
        }),
        t
      );
    }
    warn(e, t, r) {
      let i = { node: this };
      for (let n in r) i[n] = r[n];
      return e.warn(t, i);
    }
    get proxyOf() {
      return this;
    }
  };
  var ar = Jr;
  Jr.default = Jr;
  let Nu = ar,
    Xr = class extends Nu {
      constructor(e) {
        e &&
          typeof e.value != "undefined" &&
          typeof e.value != "string" &&
          (e = q(x({}, e), { value: String(e.value) })),
          super(e),
          (this.type = "decl");
      }
      get variable() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    };
  var lr = Xr;
  Xr.default = Xr;
  let ku = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",
    Pu =
      (s, e = 21) =>
      (t = e) => {
        let r = "",
          i = t;
        for (; i--; ) r += s[(Math.random() * s.length) | 0];
        return r;
      },
    Du = (s = 21) => {
      let e = "",
        t = s;
      for (; t--; ) e += ku[(Math.random() * 64) | 0];
      return e;
    };
  var Lu = { nanoid: Du, customAlphabet: Pu };
  let { SourceMapConsumer: di, SourceMapGenerator: mi } = ne,
    { existsSync: Tu, readFileSync: _u } = ne,
    { dirname: vr, join: Fu } = ne;
  function Uu(s) {
    return Buffer ? Buffer.from(s, "base64").toString() : window.atob(s);
  }
  let Kr = class {
    constructor(e, t) {
      if (t.map === !1) return;
      this.loadAnnotation(e), (this.inline = this.startWith(this.annotation, "data:"));
      let r = t.map ? t.map.prev : void 0,
        i = this.loadMap(t.from, r);
      !this.mapFile && t.from && (this.mapFile = t.from),
        this.mapFile && (this.root = vr(this.mapFile)),
        i && (this.text = i);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new di(this.text)), this.consumerCache;
    }
    decodeInline(e) {
      let t = /^data:application\/json;charset=utf-?8;base64,/,
        r = /^data:application\/json;base64,/,
        i = /^data:application\/json;charset=utf-?8,/,
        n = /^data:application\/json,/;
      if (i.test(e) || n.test(e)) return decodeURIComponent(e.substr(RegExp.lastMatch.length));
      if (t.test(e) || r.test(e)) return Uu(e.substr(RegExp.lastMatch.length));
      let o = e.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + o);
    }
    getAnnotationURL(e) {
      return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(e) {
      return typeof e != "object"
        ? !1
        : typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections);
    }
    loadAnnotation(e) {
      let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
      if (!t) return;
      let r = e.lastIndexOf(t.pop()),
        i = e.indexOf("*/", r);
      r > -1 && i > -1 && (this.annotation = this.getAnnotationURL(e.substring(r, i)));
    }
    loadFile(e) {
      if (((this.root = vr(e)), Tu(e))) return (this.mapFile = e), _u(e, "utf-8").toString().trim();
    }
    loadMap(e, t) {
      if (t === !1) return !1;
      if (t) {
        if (typeof t == "string") return t;
        if (typeof t == "function") {
          let r = t(e);
          if (r) {
            let i = this.loadFile(r);
            if (!i) throw new Error("Unable to load previous source map: " + r.toString());
            return i;
          }
        } else {
          if (t instanceof di) return mi.fromSourceMap(t).toString();
          if (t instanceof mi) return t.toString();
          if (this.isMap(t)) return JSON.stringify(t);
          throw new Error("Unsupported previous source map format: " + t.toString());
        }
      } else {
        if (this.inline) return this.decodeInline(this.annotation);
        if (this.annotation) {
          let r = this.annotation;
          return e && (r = Fu(vr(e), r)), this.loadFile(r);
        }
      }
    }
    startWith(e, t) {
      return e ? e.substr(0, t.length) === t : !1;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  };
  var Tn = Kr;
  Kr.default = Kr;
  let { SourceMapConsumer: Bu, SourceMapGenerator: Wu } = ne,
    { fileURLToPath: gi, pathToFileURL: It } = ne,
    { isAbsolute: Qr, resolve: qr } = ne,
    { nanoid: zu } = Lu,
    Ir = ne,
    yi = xs,
    Gu = Tn,
    xr = Symbol("fromOffsetCache"),
    Vu = !!(Bu && Wu),
    wi = !!(qr && Qr),
    Zt = class {
      constructor(e, t = {}) {
        if (e === null || typeof e == "undefined" || (typeof e == "object" && !e.toString))
          throw new Error(`PostCSS received ${e} instead of CSS string`);
        if (
          ((this.css = e.toString()),
          this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE"
            ? ((this.hasBOM = !0), (this.css = this.css.slice(1)))
            : (this.hasBOM = !1),
          t.from && (!wi || /^\w+:\/\//.test(t.from) || Qr(t.from) ? (this.file = t.from) : (this.file = qr(t.from))),
          wi && Vu)
        ) {
          let r = new Gu(this.css, t);
          if (r.text) {
            this.map = r;
            let i = r.consumer().file;
            !this.file && i && (this.file = this.mapResolve(i));
          }
        }
        this.file || (this.id = "<input css " + zu(6) + ">"), this.map && (this.map.file = this.from);
      }
      error(e, t, r, i = {}) {
        let n, o, l;
        if (t && typeof t == "object") {
          let u = t,
            c = r;
          if (typeof u.offset == "number") {
            let h = this.fromOffset(u.offset);
            (t = h.line), (r = h.col);
          } else (t = u.line), (r = u.column);
          if (typeof c.offset == "number") {
            let h = this.fromOffset(c.offset);
            (o = h.line), (l = h.col);
          } else (o = c.line), (l = c.column);
        } else if (!r) {
          let u = this.fromOffset(t);
          (t = u.line), (r = u.col);
        }
        let a = this.origin(t, r, o, l);
        return (
          a
            ? (n = new yi(
                e,
                a.endLine === void 0 ? a.line : { column: a.column, line: a.line },
                a.endLine === void 0 ? a.column : { column: a.endColumn, line: a.endLine },
                a.source,
                a.file,
                i.plugin,
              ))
            : (n = new yi(
                e,
                o === void 0 ? t : { column: r, line: t },
                o === void 0 ? r : { column: l, line: o },
                this.css,
                this.file,
                i.plugin,
              )),
          (n.input = { column: r, endColumn: l, endLine: o, line: t, source: this.css }),
          this.file && (It && (n.input.url = It(this.file).toString()), (n.input.file = this.file)),
          n
        );
      }
      fromOffset(e) {
        let t, r;
        if (this[xr]) r = this[xr];
        else {
          let n = this.css.split(`
`);
          r = new Array(n.length);
          let o = 0;
          for (let l = 0, a = n.length; l < a; l++) (r[l] = o), (o += n[l].length + 1);
          this[xr] = r;
        }
        t = r[r.length - 1];
        let i = 0;
        if (e >= t) i = r.length - 1;
        else {
          let n = r.length - 2,
            o;
          for (; i < n; )
            if (((o = i + ((n - i) >> 1)), e < r[o])) n = o - 1;
            else if (e >= r[o + 1]) i = o + 1;
            else {
              i = o;
              break;
            }
        }
        return { col: e - r[i] + 1, line: i + 1 };
      }
      mapResolve(e) {
        return /^\w+:\/\//.test(e) ? e : qr(this.map.consumer().sourceRoot || this.map.root || ".", e);
      }
      origin(e, t, r, i) {
        if (!this.map) return !1;
        let n = this.map.consumer(),
          o = n.originalPositionFor({ column: t, line: e });
        if (!o.source) return !1;
        let l;
        typeof r == "number" && (l = n.originalPositionFor({ column: i, line: r }));
        let a;
        Qr(o.source)
          ? (a = It(o.source))
          : (a = new URL(o.source, this.map.consumer().sourceRoot || It(this.map.mapFile)));
        let u = { column: o.column, endColumn: l && l.column, endLine: l && l.line, line: o.line, url: a.toString() };
        if (a.protocol === "file:")
          if (gi) u.file = gi(a);
          else throw new Error("file: protocol is not available in this PostCSS build");
        let c = n.sourceContentFor(o.source);
        return c && (u.source = c), u;
      }
      toJSON() {
        let e = {};
        for (let t of ["hasBOM", "css", "file", "id"]) this[t] != null && (e[t] = this[t]);
        return this.map && ((e.map = x({}, this.map)), e.map.consumerCache && (e.map.consumerCache = void 0)), e;
      }
      get from() {
        return this.file || this.id;
      }
    };
  var ur = Zt;
  Zt.default = Zt;
  Ir && Ir.registerInput && Ir.registerInput(Zt);
  let { SourceMapConsumer: _n, SourceMapGenerator: _t } = ne,
    { dirname: Ft, relative: Fn, resolve: Un, sep: Bn } = ne,
    { pathToFileURL: Si } = ne,
    ju = ur,
    Hu = !!(_n && _t),
    Yu = !!(Ft && Un && Fn && Bn),
    Zu = class {
      constructor(e, t, r, i) {
        (this.stringify = e),
          (this.mapOpts = r.map || {}),
          (this.root = t),
          (this.opts = r),
          (this.css = i),
          (this.originalCSS = i),
          (this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute),
          (this.memoizedFileURLs = new Map()),
          (this.memoizedPaths = new Map()),
          (this.memoizedURLs = new Map());
      }
      addAnnotation() {
        let e;
        this.isInline()
          ? (e = "data:application/json;base64," + this.toBase64(this.map.toString()))
          : typeof this.mapOpts.annotation == "string"
            ? (e = this.mapOpts.annotation)
            : typeof this.mapOpts.annotation == "function"
              ? (e = this.mapOpts.annotation(this.opts.to, this.root))
              : (e = this.outputFile() + ".map");
        let t = `
`;
        this.css.includes(`\r
`) &&
          (t = `\r
`),
          (this.css += t + "/*# sourceMappingURL=" + e + " */");
      }
      applyPrevMaps() {
        for (let e of this.previous()) {
          let t = this.toUrl(this.path(e.file)),
            r = e.root || Ft(e.file),
            i;
          this.mapOpts.sourcesContent === !1
            ? ((i = new _n(e.text)), i.sourcesContent && (i.sourcesContent = null))
            : (i = e.consumer()),
            this.map.applySourceMap(i, t, this.toUrl(this.path(r)));
        }
      }
      clearAnnotation() {
        if (this.mapOpts.annotation !== !1)
          if (this.root) {
            let e;
            for (let t = this.root.nodes.length - 1; t >= 0; t--)
              (e = this.root.nodes[t]),
                e.type === "comment" && e.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(t);
          } else this.css && (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
      }
      generate() {
        if ((this.clearAnnotation(), Yu && Hu && this.isMap())) return this.generateMap();
        {
          let e = "";
          return (
            this.stringify(this.root, (t) => {
              e += t;
            }),
            [e]
          );
        }
      }
      generateMap() {
        if (this.root) this.generateString();
        else if (this.previous().length === 1) {
          let e = this.previous()[0].consumer();
          (e.file = this.outputFile()), (this.map = _t.fromSourceMap(e, { ignoreInvalidMapping: !0 }));
        } else
          (this.map = new _t({ file: this.outputFile(), ignoreInvalidMapping: !0 })),
            this.map.addMapping({
              generated: { column: 0, line: 1 },
              original: { column: 0, line: 1 },
              source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>",
            });
        return (
          this.isSourcesContent() && this.setSourcesContent(),
          this.root && this.previous().length > 0 && this.applyPrevMaps(),
          this.isAnnotation() && this.addAnnotation(),
          this.isInline() ? [this.css] : [this.css, this.map]
        );
      }
      generateString() {
        (this.css = ""), (this.map = new _t({ file: this.outputFile(), ignoreInvalidMapping: !0 }));
        let e = 1,
          t = 1,
          r = "<no source>",
          i = { generated: { column: 0, line: 0 }, original: { column: 0, line: 0 }, source: "" },
          n,
          o;
        this.stringify(this.root, (l, a, u) => {
          if (
            ((this.css += l),
            a &&
              u !== "end" &&
              ((i.generated.line = e),
              (i.generated.column = t - 1),
              a.source && a.source.start
                ? ((i.source = this.sourcePath(a)),
                  (i.original.line = a.source.start.line),
                  (i.original.column = a.source.start.column - 1),
                  this.map.addMapping(i))
                : ((i.source = r), (i.original.line = 1), (i.original.column = 0), this.map.addMapping(i))),
            (n = l.match(/\n/g)),
            n
              ? ((e += n.length),
                (o = l.lastIndexOf(`
`)),
                (t = l.length - o))
              : (t += l.length),
            a && u !== "start")
          ) {
            let c = a.parent || { raws: {} };
            (!(a.type === "decl" || (a.type === "atrule" && !a.nodes)) || a !== c.last || c.raws.semicolon) &&
              (a.source && a.source.end
                ? ((i.source = this.sourcePath(a)),
                  (i.original.line = a.source.end.line),
                  (i.original.column = a.source.end.column - 1),
                  (i.generated.line = e),
                  (i.generated.column = t - 2),
                  this.map.addMapping(i))
                : ((i.source = r),
                  (i.original.line = 1),
                  (i.original.column = 0),
                  (i.generated.line = e),
                  (i.generated.column = t - 1),
                  this.map.addMapping(i)));
          }
        });
      }
      isAnnotation() {
        return this.isInline()
          ? !0
          : typeof this.mapOpts.annotation != "undefined"
            ? this.mapOpts.annotation
            : this.previous().length
              ? this.previous().some((e) => e.annotation)
              : !0;
      }
      isInline() {
        if (typeof this.mapOpts.inline != "undefined") return this.mapOpts.inline;
        let e = this.mapOpts.annotation;
        return typeof e != "undefined" && e !== !0
          ? !1
          : this.previous().length
            ? this.previous().some((t) => t.inline)
            : !0;
      }
      isMap() {
        return typeof this.opts.map != "undefined" ? !!this.opts.map : this.previous().length > 0;
      }
      isSourcesContent() {
        return typeof this.mapOpts.sourcesContent != "undefined"
          ? this.mapOpts.sourcesContent
          : this.previous().length
            ? this.previous().some((e) => e.withContent())
            : !0;
      }
      outputFile() {
        return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
      }
      path(e) {
        if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
        let t = this.memoizedPaths.get(e);
        if (t) return t;
        let r = this.opts.to ? Ft(this.opts.to) : ".";
        typeof this.mapOpts.annotation == "string" && (r = Ft(Un(r, this.mapOpts.annotation)));
        let i = Fn(r, e);
        return this.memoizedPaths.set(e, i), i;
      }
      previous() {
        if (!this.previousMaps)
          if (((this.previousMaps = []), this.root))
            this.root.walk((e) => {
              if (e.source && e.source.input.map) {
                let t = e.source.input.map;
                this.previousMaps.includes(t) || this.previousMaps.push(t);
              }
            });
          else {
            let e = new ju(this.originalCSS, this.opts);
            e.map && this.previousMaps.push(e.map);
          }
        return this.previousMaps;
      }
      setSourcesContent() {
        let e = {};
        if (this.root)
          this.root.walk((t) => {
            if (t.source) {
              let r = t.source.input.from;
              if (r && !e[r]) {
                e[r] = !0;
                let i = this.usesFileUrls ? this.toFileUrl(r) : this.toUrl(this.path(r));
                this.map.setSourceContent(i, t.source.input.css);
              }
            }
          });
        else if (this.css) {
          let t = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
          this.map.setSourceContent(t, this.css);
        }
      }
      sourcePath(e) {
        return this.mapOpts.from
          ? this.toUrl(this.mapOpts.from)
          : this.usesFileUrls
            ? this.toFileUrl(e.source.input.from)
            : this.toUrl(this.path(e.source.input.from));
      }
      toBase64(e) {
        return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
      }
      toFileUrl(e) {
        let t = this.memoizedFileURLs.get(e);
        if (t) return t;
        if (Si) {
          let r = Si(e).toString();
          return this.memoizedFileURLs.set(e, r), r;
        } else throw new Error("`map.absolute` option is not available in this PostCSS build");
      }
      toUrl(e) {
        let t = this.memoizedURLs.get(e);
        if (t) return t;
        Bn === "\\" && (e = e.replace(/\\/g, "/"));
        let r = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
        return this.memoizedURLs.set(e, r), r;
      }
    };
  var Wn = Zu;
  let Ju = ar,
    es = class extends Ju {
      constructor(e) {
        super(e), (this.type = "comment");
      }
    };
  var cr = es;
  es.default = es;
  let { isClean: zn, my: Gn } = nt,
    Vn = lr,
    jn = cr,
    Xu = ar,
    Hn,
    Os,
    Rs,
    Yn;
  function Zn(s) {
    return s.map((e) => (e.nodes && (e.nodes = Zn(e.nodes)), delete e.source, e));
  }
  function Jn(s) {
    if (((s[zn] = !1), s.proxyOf.nodes)) for (let e of s.proxyOf.nodes) Jn(e);
  }
  let pe = class Xn extends Xu {
    append(...e) {
      for (let t of e) {
        let r = this.normalize(t, this.last);
        for (let i of r) this.proxyOf.nodes.push(i);
      }
      return this.markDirty(), this;
    }
    cleanRaws(e) {
      if ((super.cleanRaws(e), this.nodes)) for (let t of this.nodes) t.cleanRaws(e);
    }
    each(e) {
      if (!this.proxyOf.nodes) return;
      let t = this.getIterator(),
        r,
        i;
      for (
        ;
        this.indexes[t] < this.proxyOf.nodes.length &&
        ((r = this.indexes[t]), (i = e(this.proxyOf.nodes[r], r)), i !== !1);

      )
        this.indexes[t] += 1;
      return delete this.indexes[t], i;
    }
    every(e) {
      return this.nodes.every(e);
    }
    getIterator() {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), (this.lastEach += 1);
      let e = this.lastEach;
      return (this.indexes[e] = 0), e;
    }
    getProxyProcessor() {
      return {
        get(e, t) {
          return t === "proxyOf"
            ? e
            : e[t]
              ? t === "each" || (typeof t == "string" && t.startsWith("walk"))
                ? (...r) => e[t](...r.map((i) => (typeof i == "function" ? (n, o) => i(n.toProxy(), o) : i)))
                : t === "every" || t === "some"
                  ? (r) => e[t]((i, ...n) => r(i.toProxy(), ...n))
                  : t === "root"
                    ? () => e.root().toProxy()
                    : t === "nodes"
                      ? e.nodes.map((r) => r.toProxy())
                      : t === "first" || t === "last"
                        ? e[t].toProxy()
                        : e[t]
              : e[t];
        },
        set(e, t, r) {
          return e[t] === r || ((e[t] = r), (t === "name" || t === "params" || t === "selector") && e.markDirty()), !0;
        },
      };
    }
    index(e) {
      return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
    }
    insertAfter(e, t) {
      let r = this.index(e),
        i = this.normalize(t, this.proxyOf.nodes[r]).reverse();
      r = this.index(e);
      for (let o of i) this.proxyOf.nodes.splice(r + 1, 0, o);
      let n;
      for (let o in this.indexes) (n = this.indexes[o]), r < n && (this.indexes[o] = n + i.length);
      return this.markDirty(), this;
    }
    insertBefore(e, t) {
      let r = this.index(e),
        i = r === 0 ? "prepend" : !1,
        n = this.normalize(t, this.proxyOf.nodes[r], i).reverse();
      r = this.index(e);
      for (let l of n) this.proxyOf.nodes.splice(r, 0, l);
      let o;
      for (let l in this.indexes) (o = this.indexes[l]), r <= o && (this.indexes[l] = o + n.length);
      return this.markDirty(), this;
    }
    normalize(e, t) {
      if (typeof e == "string") e = Zn(Hn(e).nodes);
      else if (typeof e == "undefined") e = [];
      else if (Array.isArray(e)) {
        e = e.slice(0);
        for (let i of e) i.parent && i.parent.removeChild(i, "ignore");
      } else if (e.type === "root" && this.type !== "document") {
        e = e.nodes.slice(0);
        for (let i of e) i.parent && i.parent.removeChild(i, "ignore");
      } else if (e.type) e = [e];
      else if (e.prop) {
        if (typeof e.value == "undefined") throw new Error("Value field is missed in node creation");
        typeof e.value != "string" && (e.value = String(e.value)), (e = [new Vn(e)]);
      } else if (e.selector) e = [new Os(e)];
      else if (e.name) e = [new Rs(e)];
      else if (e.text) e = [new jn(e)];
      else throw new Error("Unknown node type in node creation");
      return e.map(
        (i) => (
          i[Gn] || Xn.rebuild(i),
          (i = i.proxyOf),
          i.parent && i.parent.removeChild(i),
          i[zn] && Jn(i),
          typeof i.raws.before == "undefined" &&
            t &&
            typeof t.raws.before != "undefined" &&
            (i.raws.before = t.raws.before.replace(/\S/g, "")),
          (i.parent = this.proxyOf),
          i
        ),
      );
    }
    prepend(...e) {
      e = e.reverse();
      for (let t of e) {
        let r = this.normalize(t, this.first, "prepend").reverse();
        for (let i of r) this.proxyOf.nodes.unshift(i);
        for (let i in this.indexes) this.indexes[i] = this.indexes[i] + r.length;
      }
      return this.markDirty(), this;
    }
    push(e) {
      return (e.parent = this), this.proxyOf.nodes.push(e), this;
    }
    removeAll() {
      for (let e of this.proxyOf.nodes) e.parent = void 0;
      return (this.proxyOf.nodes = []), this.markDirty(), this;
    }
    removeChild(e) {
      (e = this.index(e)), (this.proxyOf.nodes[e].parent = void 0), this.proxyOf.nodes.splice(e, 1);
      let t;
      for (let r in this.indexes) (t = this.indexes[r]), t >= e && (this.indexes[r] = t - 1);
      return this.markDirty(), this;
    }
    replaceValues(e, t, r) {
      return (
        r || ((r = t), (t = {})),
        this.walkDecls((i) => {
          (t.props && !t.props.includes(i.prop)) ||
            (t.fast && !i.value.includes(t.fast)) ||
            (i.value = i.value.replace(e, r));
        }),
        this.markDirty(),
        this
      );
    }
    some(e) {
      return this.nodes.some(e);
    }
    walk(e) {
      return this.each((t, r) => {
        let i;
        try {
          i = e(t, r);
        } catch (n) {
          throw t.addToError(n);
        }
        return i !== !1 && t.walk && (i = t.walk(e)), i;
      });
    }
    walkAtRules(e, t) {
      return t
        ? e instanceof RegExp
          ? this.walk((r, i) => {
              if (r.type === "atrule" && e.test(r.name)) return t(r, i);
            })
          : this.walk((r, i) => {
              if (r.type === "atrule" && r.name === e) return t(r, i);
            })
        : ((t = e),
          this.walk((r, i) => {
            if (r.type === "atrule") return t(r, i);
          }));
    }
    walkComments(e) {
      return this.walk((t, r) => {
        if (t.type === "comment") return e(t, r);
      });
    }
    walkDecls(e, t) {
      return t
        ? e instanceof RegExp
          ? this.walk((r, i) => {
              if (r.type === "decl" && e.test(r.prop)) return t(r, i);
            })
          : this.walk((r, i) => {
              if (r.type === "decl" && r.prop === e) return t(r, i);
            })
        : ((t = e),
          this.walk((r, i) => {
            if (r.type === "decl") return t(r, i);
          }));
    }
    walkRules(e, t) {
      return t
        ? e instanceof RegExp
          ? this.walk((r, i) => {
              if (r.type === "rule" && e.test(r.selector)) return t(r, i);
            })
          : this.walk((r, i) => {
              if (r.type === "rule" && r.selector === e) return t(r, i);
            })
        : ((t = e),
          this.walk((r, i) => {
            if (r.type === "rule") return t(r, i);
          }));
    }
    get first() {
      if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
    }
    get last() {
      if (this.proxyOf.nodes) return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
  };
  pe.registerParse = (s) => {
    Hn = s;
  };
  pe.registerRule = (s) => {
    Os = s;
  };
  pe.registerAtRule = (s) => {
    Rs = s;
  };
  pe.registerRoot = (s) => {
    Yn = s;
  };
  var Ie = pe;
  pe.default = pe;
  pe.rebuild = (s) => {
    s.type === "atrule"
      ? Object.setPrototypeOf(s, Rs.prototype)
      : s.type === "rule"
        ? Object.setPrototypeOf(s, Os.prototype)
        : s.type === "decl"
          ? Object.setPrototypeOf(s, Vn.prototype)
          : s.type === "comment"
            ? Object.setPrototypeOf(s, jn.prototype)
            : s.type === "root" && Object.setPrototypeOf(s, Yn.prototype),
      (s[Gn] = !0),
      s.nodes &&
        s.nodes.forEach((e) => {
          pe.rebuild(e);
        });
  };
  let Ku = Ie,
    Kn,
    Qn,
    Qe = class extends Ku {
      constructor(e) {
        super(x({ type: "document" }, e)), this.nodes || (this.nodes = []);
      }
      toResult(e = {}) {
        return new Kn(new Qn(), this, e).stringify();
      }
    };
  Qe.registerLazyResult = (s) => {
    Kn = s;
  };
  Qe.registerProcessor = (s) => {
    Qn = s;
  };
  var Ms = Qe;
  Qe.default = Qe;
  let ts = class {
    constructor(e, t = {}) {
      if (((this.type = "warning"), (this.text = e), t.node && t.node.source)) {
        let r = t.node.rangeBy(t);
        (this.line = r.start.line),
          (this.column = r.start.column),
          (this.endLine = r.end.line),
          (this.endColumn = r.end.column);
      }
      for (let r in t) this[r] = t[r];
    }
    toString() {
      return this.node
        ? this.node.error(this.text, { index: this.index, plugin: this.plugin, word: this.word }).message
        : this.plugin
          ? this.plugin + ": " + this.text
          : this.text;
    }
  };
  var qn = ts;
  ts.default = ts;
  let Qu = qn,
    rs = class {
      constructor(e, t, r) {
        (this.processor = e),
          (this.messages = []),
          (this.root = t),
          (this.opts = r),
          (this.css = void 0),
          (this.map = void 0);
      }
      toString() {
        return this.css;
      }
      warn(e, t = {}) {
        t.plugin || (this.lastPlugin && this.lastPlugin.postcssPlugin && (t.plugin = this.lastPlugin.postcssPlugin));
        let r = new Qu(e, t);
        return this.messages.push(r), r;
      }
      warnings() {
        return this.messages.filter((e) => e.type === "warning");
      }
      get content() {
        return this.css;
      }
    };
  var As = rs;
  rs.default = rs;
  const Or = 39,
    bi = 34,
    xt = 92,
    Ci = 47,
    Ot = 10,
    ze = 32,
    Rt = 12,
    Mt = 9,
    At = 13,
    qu = 91,
    ec = 93,
    tc = 40,
    rc = 41,
    sc = 123,
    ic = 125,
    nc = 59,
    oc = 42,
    ac = 58,
    lc = 64,
    Et = /[\t\n\f\r "#'()/;[\\\]{}]/g,
    $t = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
    uc = /.[\r\n"'(/\\]/,
    vi = /[\da-f]/i;
  var cc = function (e, t = {}) {
    let r = e.css.valueOf(),
      i = t.ignoreErrors,
      n,
      o,
      l,
      a,
      u,
      c,
      h,
      m,
      d,
      g,
      p = r.length,
      f = 0,
      b = [],
      S = [];
    function y() {
      return f;
    }
    function C(M) {
      throw e.error("Unclosed " + M, f);
    }
    function k() {
      return S.length === 0 && f >= p;
    }
    function L(M) {
      if (S.length) return S.pop();
      if (f >= p) return;
      let j = M ? M.ignoreUnclosed : !1;
      switch (((n = r.charCodeAt(f)), n)) {
        case Ot:
        case ze:
        case Mt:
        case At:
        case Rt: {
          o = f;
          do (o += 1), (n = r.charCodeAt(o));
          while (n === ze || n === Ot || n === Mt || n === At || n === Rt);
          (g = ["space", r.slice(f, o)]), (f = o - 1);
          break;
        }
        case qu:
        case ec:
        case sc:
        case ic:
        case ac:
        case nc:
        case rc: {
          let H = String.fromCharCode(n);
          g = [H, H, f];
          break;
        }
        case tc: {
          if (
            ((m = b.length ? b.pop()[1] : ""),
            (d = r.charCodeAt(f + 1)),
            m === "url" && d !== Or && d !== bi && d !== ze && d !== Ot && d !== Mt && d !== Rt && d !== At)
          ) {
            o = f;
            do {
              if (((c = !1), (o = r.indexOf(")", o + 1)), o === -1))
                if (i || j) {
                  o = f;
                  break;
                } else C("bracket");
              for (h = o; r.charCodeAt(h - 1) === xt; ) (h -= 1), (c = !c);
            } while (c);
            (g = ["brackets", r.slice(f, o + 1), f, o]), (f = o);
          } else
            (o = r.indexOf(")", f + 1)),
              (a = r.slice(f, o + 1)),
              o === -1 || uc.test(a) ? (g = ["(", "(", f]) : ((g = ["brackets", a, f, o]), (f = o));
          break;
        }
        case Or:
        case bi: {
          (l = n === Or ? "'" : '"'), (o = f);
          do {
            if (((c = !1), (o = r.indexOf(l, o + 1)), o === -1))
              if (i || j) {
                o = f + 1;
                break;
              } else C("string");
            for (h = o; r.charCodeAt(h - 1) === xt; ) (h -= 1), (c = !c);
          } while (c);
          (g = ["string", r.slice(f, o + 1), f, o]), (f = o);
          break;
        }
        case lc: {
          (Et.lastIndex = f + 1),
            Et.test(r),
            Et.lastIndex === 0 ? (o = r.length - 1) : (o = Et.lastIndex - 2),
            (g = ["at-word", r.slice(f, o + 1), f, o]),
            (f = o);
          break;
        }
        case xt: {
          for (o = f, u = !0; r.charCodeAt(o + 1) === xt; ) (o += 1), (u = !u);
          if (
            ((n = r.charCodeAt(o + 1)),
            u &&
              n !== Ci &&
              n !== ze &&
              n !== Ot &&
              n !== Mt &&
              n !== At &&
              n !== Rt &&
              ((o += 1), vi.test(r.charAt(o))))
          ) {
            for (; vi.test(r.charAt(o + 1)); ) o += 1;
            r.charCodeAt(o + 1) === ze && (o += 1);
          }
          (g = ["word", r.slice(f, o + 1), f, o]), (f = o);
          break;
        }
        default: {
          n === Ci && r.charCodeAt(f + 1) === oc
            ? ((o = r.indexOf("*/", f + 2) + 1),
              o === 0 && (i || j ? (o = r.length) : C("comment")),
              (g = ["comment", r.slice(f, o + 1), f, o]),
              (f = o))
            : (($t.lastIndex = f + 1),
              $t.test(r),
              $t.lastIndex === 0 ? (o = r.length - 1) : (o = $t.lastIndex - 2),
              (g = ["word", r.slice(f, o + 1), f, o]),
              b.push(g),
              (f = o));
          break;
        }
      }
      return f++, g;
    }
    function V(M) {
      S.push(M);
    }
    return { back: V, endOfFile: k, nextToken: L, position: y };
  };
  let eo = Ie,
    Jt = class extends eo {
      constructor(e) {
        super(e), (this.type = "atrule");
      }
      append(...e) {
        return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
      }
      prepend(...e) {
        return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
      }
    };
  var Es = Jt;
  Jt.default = Jt;
  eo.registerAtRule(Jt);
  let to = Ie,
    ro,
    so,
    De = class extends to {
      constructor(e) {
        super(e), (this.type = "root"), this.nodes || (this.nodes = []);
      }
      normalize(e, t, r) {
        let i = super.normalize(e);
        if (t) {
          if (r === "prepend")
            this.nodes.length > 1 ? (t.raws.before = this.nodes[1].raws.before) : delete t.raws.before;
          else if (this.first !== t) for (let n of i) n.raws.before = t.raws.before;
        }
        return i;
      }
      removeChild(e, t) {
        let r = this.index(e);
        return (
          !t && r === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[r].raws.before),
          super.removeChild(e)
        );
      }
      toResult(e = {}) {
        return new ro(new so(), this, e).stringify();
      }
    };
  De.registerLazyResult = (s) => {
    ro = s;
  };
  De.registerProcessor = (s) => {
    so = s;
  };
  var ot = De;
  De.default = De;
  to.registerRoot(De);
  let qe = {
    comma(s) {
      return qe.split(s, [","], !0);
    },
    space(s) {
      let e = [
        " ",
        `
`,
        "	",
      ];
      return qe.split(s, e);
    },
    split(s, e, t) {
      let r = [],
        i = "",
        n = !1,
        o = 0,
        l = !1,
        a = "",
        u = !1;
      for (let c of s)
        u
          ? (u = !1)
          : c === "\\"
            ? (u = !0)
            : l
              ? c === a && (l = !1)
              : c === '"' || c === "'"
                ? ((l = !0), (a = c))
                : c === "("
                  ? (o += 1)
                  : c === ")"
                    ? o > 0 && (o -= 1)
                    : o === 0 && e.includes(c) && (n = !0),
          n ? (i !== "" && r.push(i.trim()), (i = ""), (n = !1)) : (i += c);
      return (t || i !== "") && r.push(i.trim()), r;
    },
  };
  var io = qe;
  qe.default = qe;
  let no = Ie,
    hc = io,
    Xt = class extends no {
      constructor(e) {
        super(e), (this.type = "rule"), this.nodes || (this.nodes = []);
      }
      get selectors() {
        return hc.comma(this.selector);
      }
      set selectors(e) {
        let t = this.selector ? this.selector.match(/,\s*/) : null,
          r = t ? t[0] : "," + this.raw("between", "beforeOpen");
        this.selector = e.join(r);
      }
    };
  var $s = Xt;
  Xt.default = Xt;
  no.registerRule(Xt);
  let fc = lr,
    pc = cc,
    dc = cr,
    mc = Es,
    gc = ot,
    Ii = $s;
  const xi = { empty: !0, space: !0 };
  function yc(s) {
    for (let e = s.length - 1; e >= 0; e--) {
      let t = s[e],
        r = t[3] || t[2];
      if (r) return r;
    }
  }
  let wc = class {
    constructor(e) {
      (this.input = e),
        (this.root = new gc()),
        (this.current = this.root),
        (this.spaces = ""),
        (this.semicolon = !1),
        this.createTokenizer(),
        (this.root.source = { input: e, start: { column: 1, line: 1, offset: 0 } });
    }
    atrule(e) {
      let t = new mc();
      (t.name = e[1].slice(1)), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
      let r,
        i,
        n,
        o = !1,
        l = !1,
        a = [],
        u = [];
      for (; !this.tokenizer.endOfFile(); ) {
        if (
          ((e = this.tokenizer.nextToken()),
          (r = e[0]),
          r === "(" || r === "["
            ? u.push(r === "(" ? ")" : "]")
            : r === "{" && u.length > 0
              ? u.push("}")
              : r === u[u.length - 1] && u.pop(),
          u.length === 0)
        )
          if (r === ";") {
            (t.source.end = this.getPosition(e[2])), t.source.end.offset++, (this.semicolon = !0);
            break;
          } else if (r === "{") {
            l = !0;
            break;
          } else if (r === "}") {
            if (a.length > 0) {
              for (n = a.length - 1, i = a[n]; i && i[0] === "space"; ) i = a[--n];
              i && ((t.source.end = this.getPosition(i[3] || i[2])), t.source.end.offset++);
            }
            this.end(e);
            break;
          } else a.push(e);
        else a.push(e);
        if (this.tokenizer.endOfFile()) {
          o = !0;
          break;
        }
      }
      (t.raws.between = this.spacesAndCommentsFromEnd(a)),
        a.length
          ? ((t.raws.afterName = this.spacesAndCommentsFromStart(a)),
            this.raw(t, "params", a),
            o &&
              ((e = a[a.length - 1]),
              (t.source.end = this.getPosition(e[3] || e[2])),
              t.source.end.offset++,
              (this.spaces = t.raws.between),
              (t.raws.between = "")))
          : ((t.raws.afterName = ""), (t.params = "")),
        l && ((t.nodes = []), (this.current = t));
    }
    checkMissedSemicolon(e) {
      let t = this.colon(e);
      if (t === !1) return;
      let r = 0,
        i;
      for (let n = t - 1; n >= 0 && ((i = e[n]), !(i[0] !== "space" && ((r += 1), r === 2))); n--);
      throw this.input.error("Missed semicolon", i[0] === "word" ? i[3] + 1 : i[2]);
    }
    colon(e) {
      let t = 0,
        r,
        i,
        n;
      for (let [o, l] of e.entries()) {
        if (((r = l), (i = r[0]), i === "(" && (t += 1), i === ")" && (t -= 1), t === 0 && i === ":"))
          if (!n) this.doubleColon(r);
          else {
            if (n[0] === "word" && n[1] === "progid") continue;
            return o;
          }
        n = r;
      }
      return !1;
    }
    comment(e) {
      let t = new dc();
      this.init(t, e[2]), (t.source.end = this.getPosition(e[3] || e[2])), t.source.end.offset++;
      let r = e[1].slice(2, -2);
      if (/^\s*$/.test(r)) (t.text = ""), (t.raws.left = r), (t.raws.right = "");
      else {
        let i = r.match(/^(\s*)([^]*\S)(\s*)$/);
        (t.text = i[2]), (t.raws.left = i[1]), (t.raws.right = i[3]);
      }
    }
    createTokenizer() {
      this.tokenizer = pc(this.input);
    }
    decl(e, t) {
      let r = new fc();
      this.init(r, e[0][2]);
      let i = e[e.length - 1];
      for (
        i[0] === ";" && ((this.semicolon = !0), e.pop()),
          r.source.end = this.getPosition(i[3] || i[2] || yc(e)),
          r.source.end.offset++;
        e[0][0] !== "word";

      )
        e.length === 1 && this.unknownWord(e), (r.raws.before += e.shift()[1]);
      for (r.source.start = this.getPosition(e[0][2]), r.prop = ""; e.length; ) {
        let u = e[0][0];
        if (u === ":" || u === "space" || u === "comment") break;
        r.prop += e.shift()[1];
      }
      r.raws.between = "";
      let n;
      for (; e.length; )
        if (((n = e.shift()), n[0] === ":")) {
          r.raws.between += n[1];
          break;
        } else n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]), (r.raws.between += n[1]);
      (r.prop[0] === "_" || r.prop[0] === "*") && ((r.raws.before += r.prop[0]), (r.prop = r.prop.slice(1)));
      let o = [],
        l;
      for (; e.length && ((l = e[0][0]), !(l !== "space" && l !== "comment")); ) o.push(e.shift());
      this.precheckMissedSemicolon(e);
      for (let u = e.length - 1; u >= 0; u--) {
        if (((n = e[u]), n[1].toLowerCase() === "!important")) {
          r.important = !0;
          let c = this.stringFrom(e, u);
          (c = this.spacesFromEnd(e) + c), c !== " !important" && (r.raws.important = c);
          break;
        } else if (n[1].toLowerCase() === "important") {
          let c = e.slice(0),
            h = "";
          for (let m = u; m > 0; m--) {
            let d = c[m][0];
            if (h.trim().indexOf("!") === 0 && d !== "space") break;
            h = c.pop()[1] + h;
          }
          h.trim().indexOf("!") === 0 && ((r.important = !0), (r.raws.important = h), (e = c));
        }
        if (n[0] !== "space" && n[0] !== "comment") break;
      }
      e.some((u) => u[0] !== "space" && u[0] !== "comment") &&
        ((r.raws.between += o.map((u) => u[1]).join("")), (o = [])),
        this.raw(r, "value", o.concat(e), t),
        r.value.includes(":") && !t && this.checkMissedSemicolon(e);
    }
    doubleColon(e) {
      throw this.input.error("Double colon", { offset: e[2] }, { offset: e[2] + e[1].length });
    }
    emptyRule(e) {
      let t = new Ii();
      this.init(t, e[2]), (t.selector = ""), (t.raws.between = ""), (this.current = t);
    }
    end(e) {
      this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon),
        (this.semicolon = !1),
        (this.current.raws.after = (this.current.raws.after || "") + this.spaces),
        (this.spaces = ""),
        this.current.parent
          ? ((this.current.source.end = this.getPosition(e[2])),
            this.current.source.end.offset++,
            (this.current = this.current.parent))
          : this.unexpectedClose(e);
    }
    endFile() {
      this.current.parent && this.unclosedBlock(),
        this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon),
        (this.current.raws.after = (this.current.raws.after || "") + this.spaces),
        (this.root.source.end = this.getPosition(this.tokenizer.position()));
    }
    freeSemicolon(e) {
      if (((this.spaces += e[1]), this.current.nodes)) {
        let t = this.current.nodes[this.current.nodes.length - 1];
        t && t.type === "rule" && !t.raws.ownSemicolon && ((t.raws.ownSemicolon = this.spaces), (this.spaces = ""));
      }
    }
    getPosition(e) {
      let t = this.input.fromOffset(e);
      return { column: t.col, line: t.line, offset: e };
    }
    init(e, t) {
      this.current.push(e),
        (e.source = { input: this.input, start: this.getPosition(t) }),
        (e.raws.before = this.spaces),
        (this.spaces = ""),
        e.type !== "comment" && (this.semicolon = !1);
    }
    other(e) {
      let t = !1,
        r = null,
        i = !1,
        n = null,
        o = [],
        l = e[1].startsWith("--"),
        a = [],
        u = e;
      for (; u; ) {
        if (((r = u[0]), a.push(u), r === "(" || r === "[")) n || (n = u), o.push(r === "(" ? ")" : "]");
        else if (l && i && r === "{") n || (n = u), o.push("}");
        else if (o.length === 0)
          if (r === ";")
            if (i) {
              this.decl(a, l);
              return;
            } else break;
          else if (r === "{") {
            this.rule(a);
            return;
          } else if (r === "}") {
            this.tokenizer.back(a.pop()), (t = !0);
            break;
          } else r === ":" && (i = !0);
        else r === o[o.length - 1] && (o.pop(), o.length === 0 && (n = null));
        u = this.tokenizer.nextToken();
      }
      if ((this.tokenizer.endOfFile() && (t = !0), o.length > 0 && this.unclosedBracket(n), t && i)) {
        if (!l)
          for (; a.length && ((u = a[a.length - 1][0]), !(u !== "space" && u !== "comment")); )
            this.tokenizer.back(a.pop());
        this.decl(a, l);
      } else this.unknownWord(a);
    }
    parse() {
      let e;
      for (; !this.tokenizer.endOfFile(); )
        switch (((e = this.tokenizer.nextToken()), e[0])) {
          case "space":
            this.spaces += e[1];
            break;
          case ";":
            this.freeSemicolon(e);
            break;
          case "}":
            this.end(e);
            break;
          case "comment":
            this.comment(e);
            break;
          case "at-word":
            this.atrule(e);
            break;
          case "{":
            this.emptyRule(e);
            break;
          default:
            this.other(e);
            break;
        }
      this.endFile();
    }
    precheckMissedSemicolon() {}
    raw(e, t, r, i) {
      let n,
        o,
        l = r.length,
        a = "",
        u = !0,
        c,
        h;
      for (let m = 0; m < l; m += 1)
        (n = r[m]),
          (o = n[0]),
          o === "space" && m === l - 1 && !i
            ? (u = !1)
            : o === "comment"
              ? ((h = r[m - 1] ? r[m - 1][0] : "empty"),
                (c = r[m + 1] ? r[m + 1][0] : "empty"),
                !xi[h] && !xi[c] ? (a.slice(-1) === "," ? (u = !1) : (a += n[1])) : (u = !1))
              : (a += n[1]);
      if (!u) {
        let m = r.reduce((d, g) => d + g[1], "");
        e.raws[t] = { raw: m, value: a };
      }
      e[t] = a;
    }
    rule(e) {
      e.pop();
      let t = new Ii();
      this.init(t, e[0][2]),
        (t.raws.between = this.spacesAndCommentsFromEnd(e)),
        this.raw(t, "selector", e),
        (this.current = t);
    }
    spacesAndCommentsFromEnd(e) {
      let t,
        r = "";
      for (; e.length && ((t = e[e.length - 1][0]), !(t !== "space" && t !== "comment")); ) r = e.pop()[1] + r;
      return r;
    }
    spacesAndCommentsFromStart(e) {
      let t,
        r = "";
      for (; e.length && ((t = e[0][0]), !(t !== "space" && t !== "comment")); ) r += e.shift()[1];
      return r;
    }
    spacesFromEnd(e) {
      let t,
        r = "";
      for (; e.length && ((t = e[e.length - 1][0]), t === "space"); ) r = e.pop()[1] + r;
      return r;
    }
    stringFrom(e, t) {
      let r = "";
      for (let i = t; i < e.length; i++) r += e[i][1];
      return e.splice(t, e.length - t), r;
    }
    unclosedBlock() {
      let e = this.current.source.start;
      throw this.input.error("Unclosed block", e.line, e.column);
    }
    unclosedBracket(e) {
      throw this.input.error("Unclosed bracket", { offset: e[2] }, { offset: e[2] + 1 });
    }
    unexpectedClose(e) {
      throw this.input.error("Unexpected }", { offset: e[2] }, { offset: e[2] + 1 });
    }
    unknownWord(e) {
      throw this.input.error("Unknown word", { offset: e[0][2] }, { offset: e[0][2] + e[0][1].length });
    }
    unnamedAtrule(e, t) {
      throw this.input.error("At-rule without name", { offset: t[2] }, { offset: t[2] + t[1].length });
    }
  };
  var Sc = wc;
  let bc = Ie,
    Cc = Sc,
    vc = ur;
  function Kt(s, e) {
    let t = new vc(s, e),
      r = new Cc(t);
    try {
      r.parse();
    } catch (i) {
      throw i;
    }
    return r.root;
  }
  var Ns = Kt;
  Kt.default = Kt;
  bc.registerParse(Kt);
  let { isClean: ue, my: Ic } = nt,
    xc = Wn,
    Oc = or,
    Rc = Ie,
    Mc = Ms;
  let Oi = As,
    Ac = Ns,
    Ec = ot;
  const $c = {
      atrule: "AtRule",
      comment: "Comment",
      decl: "Declaration",
      document: "Document",
      root: "Root",
      rule: "Rule",
    },
    Nc = {
      AtRule: !0,
      AtRuleExit: !0,
      Comment: !0,
      CommentExit: !0,
      Declaration: !0,
      DeclarationExit: !0,
      Document: !0,
      DocumentExit: !0,
      Once: !0,
      OnceExit: !0,
      postcssPlugin: !0,
      prepare: !0,
      Root: !0,
      RootExit: !0,
      Rule: !0,
      RuleExit: !0,
    },
    kc = { Once: !0, postcssPlugin: !0, prepare: !0 },
    Le = 0;
  function Ge(s) {
    return typeof s == "object" && typeof s.then == "function";
  }
  function oo(s) {
    let e = !1,
      t = $c[s.type];
    return (
      s.type === "decl" ? (e = s.prop.toLowerCase()) : s.type === "atrule" && (e = s.name.toLowerCase()),
      e && s.append
        ? [t, t + "-" + e, Le, t + "Exit", t + "Exit-" + e]
        : e
          ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e]
          : s.append
            ? [t, Le, t + "Exit"]
            : [t, t + "Exit"]
    );
  }
  function Ri(s) {
    let e;
    return (
      s.type === "document"
        ? (e = ["Document", Le, "DocumentExit"])
        : s.type === "root"
          ? (e = ["Root", Le, "RootExit"])
          : (e = oo(s)),
      { eventIndex: 0, events: e, iterator: 0, node: s, visitorIndex: 0, visitors: [] }
    );
  }
  function ss(s) {
    return (s[ue] = !1), s.nodes && s.nodes.forEach((e) => ss(e)), s;
  }
  let is = {},
    Te = class ao {
      constructor(e, t, r) {
        (this.stringified = !1), (this.processed = !1);
        let i;
        if (typeof t == "object" && t !== null && (t.type === "root" || t.type === "document")) i = ss(t);
        else if (t instanceof ao || t instanceof Oi)
          (i = ss(t.root)),
            t.map &&
              (typeof r.map == "undefined" && (r.map = {}), r.map.inline || (r.map.inline = !1), (r.map.prev = t.map));
        else {
          let n = Ac;
          r.syntax && (n = r.syntax.parse), r.parser && (n = r.parser), n.parse && (n = n.parse);
          try {
            i = n(t, r);
          } catch (o) {
            (this.processed = !0), (this.error = o);
          }
          i && !i[Ic] && Rc.rebuild(i);
        }
        (this.result = new Oi(e, i, r)),
          (this.helpers = q(x({}, is), { postcss: is, result: this.result })),
          (this.plugins = this.processor.plugins.map((n) =>
            typeof n == "object" && n.prepare ? x(x({}, n), n.prepare(this.result)) : n,
          ));
      }
      async() {
        return this.error
          ? Promise.reject(this.error)
          : this.processed
            ? Promise.resolve(this.result)
            : (this.processing || (this.processing = this.runAsync()), this.processing);
      }
      catch(e) {
        return this.async().catch(e);
      }
      finally(e) {
        return this.async().then(e, e);
      }
      getAsyncError() {
        throw new Error("Use process(css).then(cb) to work with async plugins");
      }
      handleError(e, t) {
        let r = this.result.lastPlugin;
        try {
          t && t.addToError(e),
            (this.error = e),
            e.name === "CssSyntaxError" && !e.plugin
              ? ((e.plugin = r.postcssPlugin), e.setMessage())
              : r.postcssVersion;
        } catch (i) {
          console && console.error && console.error(i);
        }
        return e;
      }
      prepareVisitors() {
        this.listeners = {};
        let e = (t, r, i) => {
          this.listeners[r] || (this.listeners[r] = []), this.listeners[r].push([t, i]);
        };
        for (let t of this.plugins)
          if (typeof t == "object")
            for (let r in t) {
              if (!Nc[r] && /^[A-Z]/.test(r))
                throw new Error(
                  `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`,
                );
              if (!kc[r])
                if (typeof t[r] == "object")
                  for (let i in t[r]) i === "*" ? e(t, r, t[r][i]) : e(t, r + "-" + i.toLowerCase(), t[r][i]);
                else typeof t[r] == "function" && e(t, r, t[r]);
            }
        this.hasListener = Object.keys(this.listeners).length > 0;
      }
      async runAsync() {
        this.plugin = 0;
        for (let e = 0; e < this.plugins.length; e++) {
          let t = this.plugins[e],
            r = this.runOnRoot(t);
          if (Ge(r))
            try {
              await r;
            } catch (i) {
              throw this.handleError(i);
            }
        }
        if ((this.prepareVisitors(), this.hasListener)) {
          let e = this.result.root;
          for (; !e[ue]; ) {
            e[ue] = !0;
            let t = [Ri(e)];
            for (; t.length > 0; ) {
              let r = this.visitTick(t);
              if (Ge(r))
                try {
                  await r;
                } catch (i) {
                  let n = t[t.length - 1].node;
                  throw this.handleError(i, n);
                }
            }
          }
          if (this.listeners.OnceExit)
            for (let [t, r] of this.listeners.OnceExit) {
              this.result.lastPlugin = t;
              try {
                if (e.type === "document") {
                  let i = e.nodes.map((n) => r(n, this.helpers));
                  await Promise.all(i);
                } else await r(e, this.helpers);
              } catch (i) {
                throw this.handleError(i);
              }
            }
        }
        return (this.processed = !0), this.stringify();
      }
      runOnRoot(e) {
        this.result.lastPlugin = e;
        try {
          if (typeof e == "object" && e.Once) {
            if (this.result.root.type === "document") {
              let t = this.result.root.nodes.map((r) => e.Once(r, this.helpers));
              return Ge(t[0]) ? Promise.all(t) : t;
            }
            return e.Once(this.result.root, this.helpers);
          } else if (typeof e == "function") return e(this.result.root, this.result);
        } catch (t) {
          throw this.handleError(t);
        }
      }
      stringify() {
        if (this.error) throw this.error;
        if (this.stringified) return this.result;
        (this.stringified = !0), this.sync();
        let e = this.result.opts,
          t = Oc;
        e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
        let i = new xc(t, this.result.root, this.result.opts).generate();
        return (this.result.css = i[0]), (this.result.map = i[1]), this.result;
      }
      sync() {
        if (this.error) throw this.error;
        if (this.processed) return this.result;
        if (((this.processed = !0), this.processing)) throw this.getAsyncError();
        for (let e of this.plugins) {
          let t = this.runOnRoot(e);
          if (Ge(t)) throw this.getAsyncError();
        }
        if ((this.prepareVisitors(), this.hasListener)) {
          let e = this.result.root;
          for (; !e[ue]; ) (e[ue] = !0), this.walkSync(e);
          if (this.listeners.OnceExit)
            if (e.type === "document") for (let t of e.nodes) this.visitSync(this.listeners.OnceExit, t);
            else this.visitSync(this.listeners.OnceExit, e);
        }
        return this.result;
      }
      then(e, t) {
        return this.async().then(e, t);
      }
      toString() {
        return this.css;
      }
      visitSync(e, t) {
        for (let [r, i] of e) {
          this.result.lastPlugin = r;
          let n;
          try {
            n = i(t, this.helpers);
          } catch (o) {
            throw this.handleError(o, t.proxyOf);
          }
          if (t.type !== "root" && t.type !== "document" && !t.parent) return !0;
          if (Ge(n)) throw this.getAsyncError();
        }
      }
      visitTick(e) {
        let t = e[e.length - 1],
          { node: r, visitors: i } = t;
        if (r.type !== "root" && r.type !== "document" && !r.parent) {
          e.pop();
          return;
        }
        if (i.length > 0 && t.visitorIndex < i.length) {
          let [o, l] = i[t.visitorIndex];
          (t.visitorIndex += 1),
            t.visitorIndex === i.length && ((t.visitors = []), (t.visitorIndex = 0)),
            (this.result.lastPlugin = o);
          try {
            return l(r.toProxy(), this.helpers);
          } catch (a) {
            throw this.handleError(a, r);
          }
        }
        if (t.iterator !== 0) {
          let o = t.iterator,
            l;
          for (; (l = r.nodes[r.indexes[o]]); )
            if (((r.indexes[o] += 1), !l[ue])) {
              (l[ue] = !0), e.push(Ri(l));
              return;
            }
          (t.iterator = 0), delete r.indexes[o];
        }
        let n = t.events;
        for (; t.eventIndex < n.length; ) {
          let o = n[t.eventIndex];
          if (((t.eventIndex += 1), o === Le)) {
            r.nodes && r.nodes.length && ((r[ue] = !0), (t.iterator = r.getIterator()));
            return;
          } else if (this.listeners[o]) {
            t.visitors = this.listeners[o];
            return;
          }
        }
        e.pop();
      }
      walkSync(e) {
        e[ue] = !0;
        let t = oo(e);
        for (let r of t)
          if (r === Le)
            e.nodes &&
              e.each((i) => {
                i[ue] || this.walkSync(i);
              });
          else {
            let i = this.listeners[r];
            if (i && this.visitSync(i, e.toProxy())) return;
          }
      }
      warnings() {
        return this.sync().warnings();
      }
      get content() {
        return this.stringify().content;
      }
      get css() {
        return this.stringify().css;
      }
      get map() {
        return this.stringify().map;
      }
      get messages() {
        return this.sync().messages;
      }
      get opts() {
        return this.result.opts;
      }
      get processor() {
        return this.result.processor;
      }
      get root() {
        return this.sync().root;
      }
      get [Symbol.toStringTag]() {
        return "LazyResult";
      }
    };
  Te.registerPostcss = (s) => {
    is = s;
  };
  var lo = Te;
  Te.default = Te;
  Ec.registerLazyResult(Te);
  Mc.registerLazyResult(Te);
  let Pc = Wn,
    Dc = or;
  let Lc = Ns;
  const Tc = As;
  let ns = class {
    constructor(e, t, r) {
      (t = t.toString()),
        (this.stringified = !1),
        (this._processor = e),
        (this._css = t),
        (this._opts = r),
        (this._map = void 0);
      let i,
        n = Dc;
      (this.result = new Tc(this._processor, i, this._opts)), (this.result.css = t);
      let o = this;
      Object.defineProperty(this.result, "root", {
        get() {
          return o.root;
        },
      });
      let l = new Pc(n, i, this._opts, t);
      if (l.isMap()) {
        let [a, u] = l.generate();
        a && (this.result.css = a), u && (this.result.map = u);
      } else l.clearAnnotation(), (this.result.css = l.css);
    }
    async() {
      return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
    }
    catch(e) {
      return this.async().catch(e);
    }
    finally(e) {
      return this.async().then(e, e);
    }
    sync() {
      if (this.error) throw this.error;
      return this.result;
    }
    then(e, t) {
      return this.async().then(e, t);
    }
    toString() {
      return this._css;
    }
    warnings() {
      return [];
    }
    get content() {
      return this.result.css;
    }
    get css() {
      return this.result.css;
    }
    get map() {
      return this.result.map;
    }
    get messages() {
      return [];
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      if (this._root) return this._root;
      let e,
        t = Lc;
      try {
        e = t(this._css, this._opts);
      } catch (r) {
        this.error = r;
      }
      if (this.error) throw this.error;
      return (this._root = e), e;
    }
    get [Symbol.toStringTag]() {
      return "NoWorkResult";
    }
  };
  var _c = ns;
  ns.default = ns;
  let Fc = _c,
    Uc = lo,
    Bc = Ms,
    Wc = ot,
    et = class {
      constructor(e = []) {
        (this.version = "8.4.38"), (this.plugins = this.normalize(e));
      }
      normalize(e) {
        let t = [];
        for (let r of e)
          if (
            (r.postcss === !0 ? (r = r()) : r.postcss && (r = r.postcss),
            typeof r == "object" && Array.isArray(r.plugins))
          )
            t = t.concat(r.plugins);
          else if (typeof r == "object" && r.postcssPlugin) t.push(r);
          else if (typeof r == "function") t.push(r);
          else if (!(typeof r == "object" && (r.parse || r.stringify))) throw new Error(r + " is not a PostCSS plugin");
        return t;
      }
      process(e, t = {}) {
        return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax
          ? new Fc(this, e, t)
          : new Uc(this, e, t);
      }
      use(e) {
        return (this.plugins = this.plugins.concat(this.normalize([e]))), this;
      }
    };
  var zc = et;
  et.default = et;
  Wc.registerProcessor(et);
  Bc.registerProcessor(et);
  let Gc = lr,
    Vc = Tn,
    jc = cr,
    Hc = Es,
    Yc = ur,
    Zc = ot,
    Jc = $s;
  function tt(s, e) {
    if (Array.isArray(s)) return s.map((o) => tt(o));
    let i = s,
      { inputs: t } = i,
      r = xe(i, ["inputs"]);
    if (t) {
      e = [];
      for (let o of t) {
        let l = q(x({}, o), { __proto__: Yc.prototype });
        l.map && (l.map = q(x({}, l.map), { __proto__: Vc.prototype })), e.push(l);
      }
    }
    if ((r.nodes && (r.nodes = s.nodes.map((o) => tt(o, e))), r.source)) {
      let n = r.source,
        { inputId: o } = n,
        l = xe(n, ["inputId"]);
      (r.source = l), o != null && (r.source.input = e[o]);
    }
    if (r.type === "root") return new Zc(r);
    if (r.type === "decl") return new Gc(r);
    if (r.type === "rule") return new Jc(r);
    if (r.type === "comment") return new jc(r);
    if (r.type === "atrule") return new Hc(r);
    throw new Error("Unknown node type: " + s.type);
  }
  var Xc = tt;
  tt.default = tt;
  let Kc = xs,
    uo = lr,
    Qc = lo,
    qc = Ie,
    ks = zc,
    eh = or,
    th = Xc,
    co = Ms,
    rh = qn,
    ho = cr,
    fo = Es,
    sh = As,
    ih = ur,
    nh = Ns,
    oh = io,
    po = $s,
    mo = ot,
    ah = ar;
  function N(...s) {
    return s.length === 1 && Array.isArray(s[0]) && (s = s[0]), new ks(s);
  }
  N.plugin = function (e, t) {
    let r = !1;
    function i(...o) {
      console &&
        console.warn &&
        !r &&
        ((r = !0),
        console.warn(
          e +
            `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`,
        ),
        process.env.LANG &&
          process.env.LANG.startsWith("cn") &&
          console.warn(
            e +
              `: \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:
https://www.w3ctech.com/topic/2226`,
          ));
      let l = t(...o);
      return (l.postcssPlugin = e), (l.postcssVersion = new ks().version), l;
    }
    let n;
    return (
      Object.defineProperty(i, "postcss", {
        get() {
          return n || (n = i()), n;
        },
      }),
      (i.process = function (o, l, a) {
        return N([i(a)]).process(o, l);
      }),
      i
    );
  };
  N.stringify = eh;
  N.parse = nh;
  N.fromJSON = th;
  N.list = oh;
  N.comment = (s) => new ho(s);
  N.atRule = (s) => new fo(s);
  N.decl = (s) => new uo(s);
  N.rule = (s) => new po(s);
  N.root = (s) => new mo(s);
  N.document = (s) => new co(s);
  N.CssSyntaxError = Kc;
  N.Declaration = uo;
  N.Container = qc;
  N.Processor = ks;
  N.Document = co;
  N.Comment = ho;
  N.Warning = rh;
  N.AtRule = fo;
  N.Result = sh;
  N.Input = ih;
  N.Rule = po;
  N.Root = mo;
  N.Node = ah;
  Qc.registerPostcss(N);
  var lh = N;
  N.default = N;
  const U = bu(lh);
  U.stringify;
  U.fromJSON;
  U.plugin;
  U.parse;
  U.list;
  U.document;
  U.comment;
  U.atRule;
  U.rule;
  U.decl;
  U.root;
  U.CssSyntaxError;
  U.Declaration;
  U.Container;
  U.Processor;
  U.Document;
  U.Comment;
  U.Warning;
  U.AtRule;
  U.Result;
  U.Input;
  U.Rule;
  U.Root;
  U.Node;
  class Ps {
    constructor(...e) {
      ee(this, "parentElement", null),
        ee(this, "parentNode", null),
        ee(this, "ownerDocument"),
        ee(this, "firstChild", null),
        ee(this, "lastChild", null),
        ee(this, "previousSibling", null),
        ee(this, "nextSibling", null),
        ee(this, "ELEMENT_NODE", 1),
        ee(this, "TEXT_NODE", 3),
        ee(this, "nodeType"),
        ee(this, "nodeName"),
        ee(this, "RRNodeType");
    }
    get childNodes() {
      const e = [];
      let t = this.firstChild;
      for (; t; ) e.push(t), (t = t.nextSibling);
      return e;
    }
    contains(e) {
      if (e instanceof Ps) {
        if (e.ownerDocument !== this.ownerDocument) return !1;
        if (e === this) return !0;
      } else return !1;
      for (; e.parentNode; ) {
        if (e.parentNode === this) return !0;
        e = e.parentNode;
      }
      return !1;
    }
    appendChild(e) {
      throw new Error(
        "RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.",
      );
    }
    insertBefore(e, t) {
      throw new Error(
        "RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.",
      );
    }
    removeChild(e) {
      throw new Error(
        "RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.",
      );
    }
    toString() {
      return "RRNode";
    }
  }
  const Mi = {
      Node: ["childNodes", "parentNode", "parentElement", "textContent"],
      ShadowRoot: ["host", "styleSheets"],
      Element: ["shadowRoot", "querySelector", "querySelectorAll"],
      MutationObserver: [],
    },
    Ai = {
      Node: ["contains", "getRootNode"],
      ShadowRoot: ["getSelection"],
      Element: [],
      MutationObserver: ["constructor"],
    },
    Nt = {};
  function Ds(s) {
    if (Nt[s]) return Nt[s];
    const e = globalThis[s],
      t = e.prototype,
      r = s in Mi ? Mi[s] : void 0,
      i = !!(
        r &&
        r.every((l) => {
          var a, u;
          return !!(
            (u = (a = Object.getOwnPropertyDescriptor(t, l)) == null ? void 0 : a.get) != null &&
            u.toString().includes("[native code]")
          );
        })
      ),
      n = s in Ai ? Ai[s] : void 0,
      o = !!(
        n &&
        n.every((l) => {
          var a;
          return typeof t[l] == "function" && ((a = t[l]) == null ? void 0 : a.toString().includes("[native code]"));
        })
      );
    if (i && o) return (Nt[s] = e.prototype), e.prototype;
    try {
      const l = document.createElement("iframe");
      document.body.appendChild(l);
      const a = l.contentWindow;
      if (!a) return e.prototype;
      const u = a[s].prototype;
      return document.body.removeChild(l), u ? (Nt[s] = u) : t;
    } catch (l) {
      return t;
    }
  }
  const Rr = {};
  function ge(s, e, t) {
    var r;
    const i = `${s}.${String(t)}`;
    if (Rr[i]) return Rr[i].call(e);
    const n = Ds(s),
      o = (r = Object.getOwnPropertyDescriptor(n, t)) == null ? void 0 : r.get;
    return o ? ((Rr[i] = o), o.call(e)) : e[t];
  }
  const Mr = {};
  function go(s, e, t) {
    const r = `${s}.${String(t)}`;
    if (Mr[r]) return Mr[r].bind(e);
    const n = Ds(s)[t];
    return typeof n != "function" ? e[t] : ((Mr[r] = n), n.bind(e));
  }
  function uh(s) {
    return ge("Node", s, "childNodes");
  }
  function ch(s) {
    return ge("Node", s, "parentNode");
  }
  function hh(s) {
    return ge("Node", s, "parentElement");
  }
  function fh(s) {
    return ge("Node", s, "textContent");
  }
  function ph(s, e) {
    return go("Node", s, "contains")(e);
  }
  function dh(s) {
    return go("Node", s, "getRootNode")();
  }
  function mh(s) {
    return !s || !("host" in s) ? null : ge("ShadowRoot", s, "host");
  }
  function gh(s) {
    return s.styleSheets;
  }
  function yh(s) {
    return !s || !("shadowRoot" in s) ? null : ge("Element", s, "shadowRoot");
  }
  function wh(s, e) {
    return ge("Element", s, "querySelector")(e);
  }
  function Sh(s, e) {
    return ge("Element", s, "querySelectorAll")(e);
  }
  function yo() {
    return Ds("MutationObserver").constructor;
  }
  const v = {
    childNodes: uh,
    parentNode: ch,
    parentElement: hh,
    textContent: fh,
    contains: ph,
    getRootNode: dh,
    host: mh,
    styleSheets: gh,
    shadowRoot: yh,
    querySelector: wh,
    querySelectorAll: Sh,
    mutationObserver: yo,
  };
  function J(s, e, t = document) {
    const r = { capture: !0, passive: !0 };
    return t.addEventListener(s, e, r), () => t.removeEventListener(s, e, r);
  }
  const Re = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`;
  let Ei = {
    map: {},
    getId() {
      return console.error(Re), -1;
    },
    getNode() {
      return console.error(Re), null;
    },
    removeNodeFromMap() {
      console.error(Re);
    },
    has() {
      return console.error(Re), !1;
    },
    reset() {
      console.error(Re);
    },
  };
  typeof window != "undefined" &&
    window.Proxy &&
    window.Reflect &&
    (Ei = new Proxy(Ei, {
      get(s, e, t) {
        return e === "map" && console.error(Re), Reflect.get(s, e, t);
      },
    }));
  function rt(s, e, t = {}) {
    let r = null,
      i = 0;
    return function (...n) {
      const o = Date.now();
      !i && t.leading === !1 && (i = o);
      const l = e - (o - i),
        a = this;
      l <= 0 || l > e
        ? (r && (clearTimeout(r), (r = null)), (i = o), s.apply(a, n))
        : !r &&
          t.trailing !== !1 &&
          (r = setTimeout(() => {
            (i = t.leading === !1 ? 0 : Date.now()), (r = null), s.apply(a, n);
          }, l));
    };
  }
  function hr(s, e, t, r, i = window) {
    const n = i.Object.getOwnPropertyDescriptor(s, e);
    return (
      i.Object.defineProperty(
        s,
        e,
        r
          ? t
          : {
              set(o) {
                setTimeout(() => {
                  t.set.call(this, o);
                }, 0),
                  n && n.set && n.set.call(this, o);
              },
            },
      ),
      () => hr(s, e, n || {}, !0)
    );
  }
  function Fe(s, e, t) {
    try {
      if (!(e in s)) return () => {};
      const r = s[e],
        i = t(r);
      return (
        typeof i == "function" &&
          ((i.prototype = i.prototype || {}),
          Object.defineProperties(i, { __rrweb_original__: { enumerable: !1, value: r } })),
        (s[e] = i),
        () => {
          s[e] = r;
        }
      );
    } catch (r) {
      return () => {};
    }
  }
  let Qt = Date.now;
  /[1-9][0-9]{12}/.test(Date.now().toString()) || (Qt = () => new Date().getTime());
  function wo(s) {
    var e, t, r, i;
    const n = s.document;
    return {
      left: n.scrollingElement
        ? n.scrollingElement.scrollLeft
        : s.pageXOffset !== void 0
          ? s.pageXOffset
          : n.documentElement.scrollLeft ||
            ((n == null ? void 0 : n.body) && ((e = v.parentElement(n.body)) == null ? void 0 : e.scrollLeft)) ||
            ((t = n == null ? void 0 : n.body) == null ? void 0 : t.scrollLeft) ||
            0,
      top: n.scrollingElement
        ? n.scrollingElement.scrollTop
        : s.pageYOffset !== void 0
          ? s.pageYOffset
          : (n == null ? void 0 : n.documentElement.scrollTop) ||
            ((n == null ? void 0 : n.body) && ((r = v.parentElement(n.body)) == null ? void 0 : r.scrollTop)) ||
            ((i = n == null ? void 0 : n.body) == null ? void 0 : i.scrollTop) ||
            0,
    };
  }
  function So() {
    return (
      window.innerHeight ||
      (document.documentElement && document.documentElement.clientHeight) ||
      (document.body && document.body.clientHeight)
    );
  }
  function bo() {
    return (
      window.innerWidth ||
      (document.documentElement && document.documentElement.clientWidth) ||
      (document.body && document.body.clientWidth)
    );
  }
  function Co(s) {
    return s ? (s.nodeType === s.ELEMENT_NODE ? s : v.parentElement(s)) : null;
  }
  function X(s, e, t, r) {
    if (!s) return !1;
    const i = Co(s);
    if (!i) return !1;
    try {
      if (typeof e == "string") {
        if (i.classList.contains(e) || (r && i.closest("." + e) !== null)) return !0;
      } else if (Gt(i, e, r)) return !0;
    } catch (n) {}
    return !!(t && (i.matches(t) || (r && i.closest(t) !== null)));
  }
  function bh(s, e) {
    return e.getId(s) !== -1;
  }
  function Ar(s, e, t) {
    return s.tagName === "TITLE" && t.headTitleMutations ? !0 : e.getId(s) === Ye;
  }
  function vo(s, e) {
    if (Ve(s)) return !1;
    const t = e.getId(s);
    if (!e.has(t)) return !0;
    const r = v.parentNode(s);
    return r && r.nodeType === s.DOCUMENT_NODE ? !1 : r ? vo(r, e) : !0;
  }
  function os(s) {
    return !!s.changedTouches;
  }
  function Ch(s = window) {
    "NodeList" in s && !s.NodeList.prototype.forEach && (s.NodeList.prototype.forEach = Array.prototype.forEach),
      "DOMTokenList" in s &&
        !s.DOMTokenList.prototype.forEach &&
        (s.DOMTokenList.prototype.forEach = Array.prototype.forEach);
  }
  function Io(s, e) {
    return !!(s.nodeName === "IFRAME" && e.getMeta(s));
  }
  function xo(s, e) {
    return !!(
      s.nodeName === "LINK" &&
      s.nodeType === s.ELEMENT_NODE &&
      s.getAttribute &&
      s.getAttribute("rel") === "stylesheet" &&
      e.getMeta(s)
    );
  }
  function as(s) {
    return s ? (s instanceof Ps && "shadowRoot" in s ? !!s.shadowRoot : !!v.shadowRoot(s)) : !1;
  }
  class vh {
    constructor() {
      w(this, "id", 1), w(this, "styleIDMap", new WeakMap()), w(this, "idStyleMap", new Map());
    }
    getId(e) {
      var t;
      return (t = this.styleIDMap.get(e)) != null ? t : -1;
    }
    has(e) {
      return this.styleIDMap.has(e);
    }
    add(e, t) {
      if (this.has(e)) return this.getId(e);
      let r;
      return t === void 0 ? (r = this.id++) : (r = t), this.styleIDMap.set(e, r), this.idStyleMap.set(r, e), r;
    }
    getStyle(e) {
      return this.idStyleMap.get(e) || null;
    }
    reset() {
      (this.styleIDMap = new WeakMap()), (this.idStyleMap = new Map()), (this.id = 1);
    }
    generateId() {
      return this.id++;
    }
  }
  function Oo(s) {
    var e;
    let t = null;
    return (
      "getRootNode" in s &&
        ((e = v.getRootNode(s)) == null ? void 0 : e.nodeType) === Node.DOCUMENT_FRAGMENT_NODE &&
        v.host(v.getRootNode(s)) &&
        (t = v.host(v.getRootNode(s))),
      t
    );
  }
  function Ih(s) {
    let e = s,
      t;
    for (; (t = Oo(e)); ) e = t;
    return e;
  }
  function xh(s) {
    const e = s.ownerDocument;
    if (!e) return !1;
    const t = Ih(s);
    return v.contains(e, t);
  }
  function Ro(s) {
    const e = s.ownerDocument;
    return e ? v.contains(e, s) || xh(s) : !1;
  }
  var R = ((s) => (
      (s[(s.DomContentLoaded = 0)] = "DomContentLoaded"),
      (s[(s.Load = 1)] = "Load"),
      (s[(s.FullSnapshot = 2)] = "FullSnapshot"),
      (s[(s.IncrementalSnapshot = 3)] = "IncrementalSnapshot"),
      (s[(s.Meta = 4)] = "Meta"),
      (s[(s.Custom = 5)] = "Custom"),
      (s[(s.Plugin = 6)] = "Plugin"),
      s
    ))(R || {}),
    I = ((s) => (
      (s[(s.Mutation = 0)] = "Mutation"),
      (s[(s.MouseMove = 1)] = "MouseMove"),
      (s[(s.MouseInteraction = 2)] = "MouseInteraction"),
      (s[(s.Scroll = 3)] = "Scroll"),
      (s[(s.ViewportResize = 4)] = "ViewportResize"),
      (s[(s.Input = 5)] = "Input"),
      (s[(s.TouchMove = 6)] = "TouchMove"),
      (s[(s.MediaInteraction = 7)] = "MediaInteraction"),
      (s[(s.StyleSheetRule = 8)] = "StyleSheetRule"),
      (s[(s.CanvasMutation = 9)] = "CanvasMutation"),
      (s[(s.Font = 10)] = "Font"),
      (s[(s.Log = 11)] = "Log"),
      (s[(s.Drag = 12)] = "Drag"),
      (s[(s.StyleDeclaration = 13)] = "StyleDeclaration"),
      (s[(s.Selection = 14)] = "Selection"),
      (s[(s.AdoptedStyleSheet = 15)] = "AdoptedStyleSheet"),
      (s[(s.CustomElement = 16)] = "CustomElement"),
      s
    ))(I || {}),
    K = ((s) => (
      (s[(s.MouseUp = 0)] = "MouseUp"),
      (s[(s.MouseDown = 1)] = "MouseDown"),
      (s[(s.Click = 2)] = "Click"),
      (s[(s.ContextMenu = 3)] = "ContextMenu"),
      (s[(s.DblClick = 4)] = "DblClick"),
      (s[(s.Focus = 5)] = "Focus"),
      (s[(s.Blur = 6)] = "Blur"),
      (s[(s.TouchStart = 7)] = "TouchStart"),
      (s[(s.TouchMove_Departed = 8)] = "TouchMove_Departed"),
      (s[(s.TouchEnd = 9)] = "TouchEnd"),
      (s[(s.TouchCancel = 10)] = "TouchCancel"),
      s
    ))(K || {}),
    he = ((s) => ((s[(s.Mouse = 0)] = "Mouse"), (s[(s.Pen = 1)] = "Pen"), (s[(s.Touch = 2)] = "Touch"), s))(he || {}),
    _e = ((s) => ((s[(s["2D"] = 0)] = "2D"), (s[(s.WebGL = 1)] = "WebGL"), (s[(s.WebGL2 = 2)] = "WebGL2"), s))(
      _e || {},
    ),
    Me = ((s) => (
      (s[(s.Play = 0)] = "Play"),
      (s[(s.Pause = 1)] = "Pause"),
      (s[(s.Seeked = 2)] = "Seeked"),
      (s[(s.VolumeChange = 3)] = "VolumeChange"),
      (s[(s.RateChange = 4)] = "RateChange"),
      s
    ))(Me || {});
  function $i(s) {
    return "__ln" in s;
  }
  class Oh {
    constructor() {
      w(this, "length", 0), w(this, "head", null), w(this, "tail", null);
    }
    get(e) {
      if (e >= this.length) throw new Error("Position outside of list range");
      let t = this.head;
      for (let r = 0; r < e; r++) t = (t == null ? void 0 : t.next) || null;
      return t;
    }
    addNode(e) {
      const t = { value: e, previous: null, next: null };
      if (((e.__ln = t), e.previousSibling && $i(e.previousSibling))) {
        const r = e.previousSibling.__ln.next;
        (t.next = r), (t.previous = e.previousSibling.__ln), (e.previousSibling.__ln.next = t), r && (r.previous = t);
      } else if (e.nextSibling && $i(e.nextSibling) && e.nextSibling.__ln.previous) {
        const r = e.nextSibling.__ln.previous;
        (t.previous = r), (t.next = e.nextSibling.__ln), (e.nextSibling.__ln.previous = t), r && (r.next = t);
      } else this.head && (this.head.previous = t), (t.next = this.head), (this.head = t);
      t.next === null && (this.tail = t), this.length++;
    }
    removeNode(e) {
      const t = e.__ln;
      this.head &&
        (t.previous
          ? ((t.previous.next = t.next), t.next ? (t.next.previous = t.previous) : (this.tail = t.previous))
          : ((this.head = t.next), this.head ? (this.head.previous = null) : (this.tail = null)),
        e.__ln && delete e.__ln,
        this.length--);
    }
  }
  const Ni = (s, e) => `${s}@${e}`;
  class Rh {
    constructor() {
      w(this, "frozen", !1),
        w(this, "locked", !1),
        w(this, "texts", []),
        w(this, "attributes", []),
        w(this, "attributeMap", new WeakMap()),
        w(this, "removes", []),
        w(this, "mapRemoves", []),
        w(this, "movedMap", {}),
        w(this, "addedSet", new Set()),
        w(this, "movedSet", new Set()),
        w(this, "droppedSet", new Set()),
        w(this, "mutationCb"),
        w(this, "blockClass"),
        w(this, "blockSelector"),
        w(this, "maskTextClass"),
        w(this, "maskTextSelector"),
        w(this, "inlineStylesheet"),
        w(this, "maskInputOptions"),
        w(this, "maskTextFn"),
        w(this, "maskInputFn"),
        w(this, "keepIframeSrcFn"),
        w(this, "recordCanvas"),
        w(this, "inlineImages"),
        w(this, "slimDOMOptions"),
        w(this, "dataURLOptions"),
        w(this, "doc"),
        w(this, "mirror"),
        w(this, "iframeManager"),
        w(this, "stylesheetManager"),
        w(this, "shadowDomManager"),
        w(this, "canvasManager"),
        w(this, "processedNodeManager"),
        w(this, "unattachedDoc"),
        w(this, "processMutations", (e) => {
          e.forEach(this.processMutation), this.emit();
        }),
        w(this, "emit", () => {
          if (this.frozen || this.locked) return;
          const e = [],
            t = new Set(),
            r = new Oh(),
            i = (a) => {
              let u = a,
                c = Ye;
              for (; c === Ye; ) (u = u && u.nextSibling), (c = u && this.mirror.getId(u));
              return c;
            },
            n = (a) => {
              const u = v.parentNode(a);
              if (!u || !Ro(a) || u.tagName === "TEXTAREA") return;
              const c = Ve(u) ? this.mirror.getId(Oo(a)) : this.mirror.getId(u),
                h = i(a);
              if (c === -1 || h === -1) return r.addNode(a);
              const m = Ee(a, {
                doc: this.doc,
                mirror: this.mirror,
                blockClass: this.blockClass,
                blockSelector: this.blockSelector,
                maskTextClass: this.maskTextClass,
                maskTextSelector: this.maskTextSelector,
                skipChild: !0,
                newlyAddedElement: !0,
                inlineStylesheet: this.inlineStylesheet,
                maskInputOptions: this.maskInputOptions,
                maskTextFn: this.maskTextFn,
                maskInputFn: this.maskInputFn,
                slimDOMOptions: this.slimDOMOptions,
                dataURLOptions: this.dataURLOptions,
                recordCanvas: this.recordCanvas,
                inlineImages: this.inlineImages,
                onSerialize: (d) => {
                  Io(d, this.mirror) && this.iframeManager.addIframe(d),
                    xo(d, this.mirror) && this.stylesheetManager.trackLinkElement(d),
                    as(a) && this.shadowDomManager.addShadowRoot(v.shadowRoot(a), this.doc);
                },
                onIframeLoad: (d, g) => {
                  this.iframeManager.attachIframe(d, g), this.shadowDomManager.observeAttachShadow(d);
                },
                onStylesheetLoad: (d, g) => {
                  this.stylesheetManager.attachLinkElement(d, g);
                },
              });
              m && (e.push({ parentId: c, nextId: h, node: m }), t.add(m.id));
            };
          for (; this.mapRemoves.length; ) this.mirror.removeNodeFromMap(this.mapRemoves.shift());
          for (const a of this.movedSet)
            (ki(this.removes, a, this.mirror) && !this.movedSet.has(v.parentNode(a))) || n(a);
          for (const a of this.addedSet)
            (!Pi(this.droppedSet, a) && !ki(this.removes, a, this.mirror)) || Pi(this.movedSet, a)
              ? n(a)
              : this.droppedSet.add(a);
          let o = null;
          for (; r.length; ) {
            let a = null;
            if (o) {
              const u = this.mirror.getId(v.parentNode(o.value)),
                c = i(o.value);
              u !== -1 && c !== -1 && (a = o);
            }
            if (!a) {
              let u = r.tail;
              for (; u; ) {
                const c = u;
                if (((u = u.previous), c)) {
                  const h = this.mirror.getId(v.parentNode(c.value));
                  if (i(c.value) === -1) continue;
                  if (h !== -1) {
                    a = c;
                    break;
                  } else {
                    const d = c.value,
                      g = v.parentNode(d);
                    if (g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                      const p = v.host(g);
                      if (this.mirror.getId(p) !== -1) {
                        a = c;
                        break;
                      }
                    }
                  }
                }
              }
            }
            if (!a) {
              for (; r.head; ) r.removeNode(r.head.value);
              break;
            }
            (o = a.previous), r.removeNode(a.value), n(a.value);
          }
          const l = {
            texts: this.texts
              .map((a) => {
                const u = a.node,
                  c = v.parentNode(u);
                return (
                  c && c.tagName === "TEXTAREA" && this.genTextAreaValueMutation(c),
                  { id: this.mirror.getId(u), value: a.value }
                );
              })
              .filter((a) => !t.has(a.id))
              .filter((a) => this.mirror.has(a.id)),
            attributes: this.attributes
              .map((a) => {
                const { attributes: u } = a;
                if (typeof u.style == "string") {
                  const c = JSON.stringify(a.styleDiff),
                    h = JSON.stringify(a._unchangedStyles);
                  c.length < u.style.length &&
                    (c + h).split("var(").length === u.style.split("var(").length &&
                    (u.style = a.styleDiff);
                }
                return { id: this.mirror.getId(a.node), attributes: u };
              })
              .filter((a) => !t.has(a.id))
              .filter((a) => this.mirror.has(a.id)),
            removes: this.removes,
            adds: e,
          };
          (!l.texts.length && !l.attributes.length && !l.removes.length && !l.adds.length) ||
            ((this.texts = []),
            (this.attributes = []),
            (this.attributeMap = new WeakMap()),
            (this.removes = []),
            (this.addedSet = new Set()),
            (this.movedSet = new Set()),
            (this.droppedSet = new Set()),
            (this.movedMap = {}),
            this.mutationCb(l));
        }),
        w(this, "genTextAreaValueMutation", (e) => {
          let t = this.attributeMap.get(e);
          t ||
            ((t = { node: e, attributes: {}, styleDiff: {}, _unchangedStyles: {} }),
            this.attributes.push(t),
            this.attributeMap.set(e, t)),
            (t.attributes.value = Array.from(v.childNodes(e), (r) => v.textContent(r) || "").join(""));
        }),
        w(this, "processMutation", (e) => {
          if (!Ar(e.target, this.mirror, this.slimDOMOptions))
            switch (e.type) {
              case "characterData": {
                const t = v.textContent(e.target);
                !X(e.target, this.blockClass, this.blockSelector, !1) &&
                  t !== e.oldValue &&
                  this.texts.push({
                    value:
                      Ji(e.target, this.maskTextClass, this.maskTextSelector, !0) && t
                        ? this.maskTextFn
                          ? this.maskTextFn(t, Co(e.target))
                          : t.replace(/[\S]/g, "*")
                        : t,
                    node: e.target,
                  });
                break;
              }
              case "attributes": {
                const t = e.target;
                let r = e.attributeName,
                  i = e.target.getAttribute(r);
                if (r === "value") {
                  const o = hs(t);
                  i = cs({
                    element: t,
                    maskInputOptions: this.maskInputOptions,
                    tagName: t.tagName,
                    type: o,
                    value: i,
                    maskInputFn: this.maskInputFn,
                  });
                }
                if (X(e.target, this.blockClass, this.blockSelector, !1) || i === e.oldValue) return;
                let n = this.attributeMap.get(e.target);
                if (t.tagName === "IFRAME" && r === "src" && !this.keepIframeSrcFn(i))
                  if (!t.contentDocument) r = "rr_src";
                  else return;
                if (
                  (n ||
                    ((n = { node: e.target, attributes: {}, styleDiff: {}, _unchangedStyles: {} }),
                    this.attributes.push(n),
                    this.attributeMap.set(e.target, n)),
                  r === "type" &&
                    t.tagName === "INPUT" &&
                    (e.oldValue || "").toLowerCase() === "password" &&
                    t.setAttribute("data-rr-is-password", "true"),
                  !Zi(t.tagName, r))
                )
                  if (((n.attributes[r] = Yi(this.doc, Ce(t.tagName), Ce(r), i)), r === "style")) {
                    if (!this.unattachedDoc)
                      try {
                        this.unattachedDoc = document.implementation.createHTMLDocument();
                      } catch (l) {
                        this.unattachedDoc = this.doc;
                      }
                    const o = this.unattachedDoc.createElement("span");
                    e.oldValue && o.setAttribute("style", e.oldValue);
                    for (const l of Array.from(t.style)) {
                      const a = t.style.getPropertyValue(l),
                        u = t.style.getPropertyPriority(l);
                      a !== o.style.getPropertyValue(l) || u !== o.style.getPropertyPriority(l)
                        ? u === ""
                          ? (n.styleDiff[l] = a)
                          : (n.styleDiff[l] = [a, u])
                        : (n._unchangedStyles[l] = [a, u]);
                    }
                    for (const l of Array.from(o.style)) t.style.getPropertyValue(l) === "" && (n.styleDiff[l] = !1);
                  } else
                    r === "open" &&
                      t.tagName === "DIALOG" &&
                      (t.matches("dialog:modal")
                        ? (n.attributes.rr_open_mode = "modal")
                        : (n.attributes.rr_open_mode = "non-modal"));
                break;
              }
              case "childList": {
                if (X(e.target, this.blockClass, this.blockSelector, !0)) return;
                if (e.target.tagName === "TEXTAREA") {
                  this.genTextAreaValueMutation(e.target);
                  return;
                }
                e.addedNodes.forEach((t) => this.genAdds(t, e.target)),
                  e.removedNodes.forEach((t) => {
                    const r = this.mirror.getId(t),
                      i = Ve(e.target) ? this.mirror.getId(v.host(e.target)) : this.mirror.getId(e.target);
                    X(e.target, this.blockClass, this.blockSelector, !1) ||
                      Ar(t, this.mirror, this.slimDOMOptions) ||
                      !bh(t, this.mirror) ||
                      (this.addedSet.has(t)
                        ? (ls(this.addedSet, t), this.droppedSet.add(t))
                        : (this.addedSet.has(e.target) && r === -1) ||
                          vo(e.target, this.mirror) ||
                          (this.movedSet.has(t) && this.movedMap[Ni(r, i)]
                            ? ls(this.movedSet, t)
                            : this.removes.push({
                                parentId: i,
                                id: r,
                                isShadow: Ve(e.target) && je(e.target) ? !0 : void 0,
                              })),
                      this.mapRemoves.push(t));
                  });
                break;
              }
            }
        }),
        w(this, "genAdds", (e, t) => {
          if (!this.processedNodeManager.inOtherBuffer(e, this) && !(this.addedSet.has(e) || this.movedSet.has(e))) {
            if (this.mirror.hasNode(e)) {
              if (Ar(e, this.mirror, this.slimDOMOptions)) return;
              this.movedSet.add(e);
              let r = null;
              t && this.mirror.hasNode(t) && (r = this.mirror.getId(t)),
                r && r !== -1 && (this.movedMap[Ni(this.mirror.getId(e), r)] = !0);
            } else this.addedSet.add(e), this.droppedSet.delete(e);
            X(e, this.blockClass, this.blockSelector, !1) ||
              (v.childNodes(e).forEach((r) => this.genAdds(r)),
              as(e) &&
                v.childNodes(v.shadowRoot(e)).forEach((r) => {
                  this.processedNodeManager.add(r, this), this.genAdds(r, e);
                }));
          }
        });
    }
    init(e) {
      [
        "mutationCb",
        "blockClass",
        "blockSelector",
        "maskTextClass",
        "maskTextSelector",
        "inlineStylesheet",
        "maskInputOptions",
        "maskTextFn",
        "maskInputFn",
        "keepIframeSrcFn",
        "recordCanvas",
        "inlineImages",
        "slimDOMOptions",
        "dataURLOptions",
        "doc",
        "mirror",
        "iframeManager",
        "stylesheetManager",
        "shadowDomManager",
        "canvasManager",
        "processedNodeManager",
      ].forEach((t) => {
        this[t] = e[t];
      });
    }
    freeze() {
      (this.frozen = !0), this.canvasManager.freeze();
    }
    unfreeze() {
      (this.frozen = !1), this.canvasManager.unfreeze(), this.emit();
    }
    isFrozen() {
      return this.frozen;
    }
    lock() {
      (this.locked = !0), this.canvasManager.lock();
    }
    unlock() {
      (this.locked = !1), this.canvasManager.unlock(), this.emit();
    }
    reset() {
      this.shadowDomManager.reset(), this.canvasManager.reset();
    }
  }
  function ls(s, e) {
    s.delete(e), v.childNodes(e).forEach((t) => ls(s, t));
  }
  function ki(s, e, t) {
    return s.length === 0 ? !1 : Mh(s, e, t);
  }
  function Mh(s, e, t) {
    let r = v.parentNode(e);
    for (; r; ) {
      const i = t.getId(r);
      if (s.some((n) => n.id === i)) return !0;
      r = v.parentNode(r);
    }
    return !1;
  }
  function Pi(s, e) {
    return s.size === 0 ? !1 : Mo(s, e);
  }
  function Mo(s, e) {
    const t = v.parentNode(e);
    return t ? (s.has(t) ? !0 : Mo(s, t)) : !1;
  }
  let He;
  function Ah(s) {
    He = s;
  }
  function Eh() {
    He = void 0;
  }
  const O = (s) =>
      He
        ? (...t) => {
            try {
              return s(...t);
            } catch (r) {
              if (He && He(r) === !0) return;
              throw r;
            }
          }
        : s,
    be = [];
  function at(s) {
    try {
      if ("composedPath" in s) {
        const e = s.composedPath();
        if (e.length) return e[0];
      } else if ("path" in s && s.path.length) return s.path[0];
    } catch (e) {}
    return s && s.target;
  }
  function Ao(s, e) {
    const t = new Rh();
    be.push(t), t.init(s);
    const r = new (yo())(O(t.processMutations.bind(t)));
    return (
      r.observe(e, {
        attributes: !0,
        attributeOldValue: !0,
        characterData: !0,
        characterDataOldValue: !0,
        childList: !0,
        subtree: !0,
      }),
      r
    );
  }
  function $h({ mousemoveCb: s, sampling: e, doc: t, mirror: r }) {
    if (e.mousemove === !1) return () => {};
    const i = typeof e.mousemove == "number" ? e.mousemove : 50,
      n = typeof e.mousemoveCallback == "number" ? e.mousemoveCallback : 500;
    let o = [],
      l;
    const a = rt(
        O((h) => {
          const m = Date.now() - l;
          s(
            o.map((d) => ((d.timeOffset -= m), d)),
            h,
          ),
            (o = []),
            (l = null);
        }),
        n,
      ),
      u = O(
        rt(
          O((h) => {
            const m = at(h),
              { clientX: d, clientY: g } = os(h) ? h.changedTouches[0] : h;
            l || (l = Qt()),
              o.push({ x: d, y: g, id: r.getId(m), timeOffset: Qt() - l }),
              a(
                typeof DragEvent != "undefined" && h instanceof DragEvent
                  ? I.Drag
                  : h instanceof MouseEvent
                    ? I.MouseMove
                    : I.TouchMove,
              );
          }),
          i,
          { trailing: !1 },
        ),
      ),
      c = [J("mousemove", u, t), J("touchmove", u, t), J("drag", u, t)];
    return O(() => {
      c.forEach((h) => h());
    });
  }
  function Nh({ mouseInteractionCb: s, doc: e, mirror: t, blockClass: r, blockSelector: i, sampling: n }) {
    if (n.mouseInteraction === !1) return () => {};
    const o = n.mouseInteraction === !0 || n.mouseInteraction === void 0 ? {} : n.mouseInteraction,
      l = [];
    let a = null;
    const u = (c) => (h) => {
      const m = at(h);
      if (X(m, r, i, !0)) return;
      let d = null,
        g = c;
      if ("pointerType" in h) {
        switch (h.pointerType) {
          case "mouse":
            d = he.Mouse;
            break;
          case "touch":
            d = he.Touch;
            break;
          case "pen":
            d = he.Pen;
            break;
        }
        d === he.Touch ? (K[c] === K.MouseDown ? (g = "TouchStart") : K[c] === K.MouseUp && (g = "TouchEnd")) : he.Pen;
      } else os(h) && (d = he.Touch);
      d !== null
        ? ((a = d),
          ((g.startsWith("Touch") && d === he.Touch) || (g.startsWith("Mouse") && d === he.Mouse)) && (d = null))
        : K[c] === K.Click && ((d = a), (a = null));
      const p = os(h) ? h.changedTouches[0] : h;
      if (!p) return;
      const f = t.getId(m),
        { clientX: b, clientY: S } = p;
      O(s)(x({ type: K[g], id: f, x: b, y: S }, d !== null && { pointerType: d }));
    };
    return (
      Object.keys(K)
        .filter((c) => Number.isNaN(Number(c)) && !c.endsWith("_Departed") && o[c] !== !1)
        .forEach((c) => {
          let h = Ce(c);
          const m = u(c);
          if (window.PointerEvent)
            switch (K[c]) {
              case K.MouseDown:
              case K.MouseUp:
                h = h.replace("mouse", "pointer");
                break;
              case K.TouchStart:
              case K.TouchEnd:
                return;
            }
          l.push(J(h, m, e));
        }),
      O(() => {
        l.forEach((c) => c());
      })
    );
  }
  function Eo({ scrollCb: s, doc: e, mirror: t, blockClass: r, blockSelector: i, sampling: n }) {
    const o = O(
      rt(
        O((l) => {
          const a = at(l);
          if (!a || X(a, r, i, !0)) return;
          const u = t.getId(a);
          if (a === e && e.defaultView) {
            const c = wo(e.defaultView);
            s({ id: u, x: c.left, y: c.top });
          } else s({ id: u, x: a.scrollLeft, y: a.scrollTop });
        }),
        n.scroll || 100,
      ),
    );
    return J("scroll", o, e);
  }
  function kh({ viewportResizeCb: s }, { win: e }) {
    let t = -1,
      r = -1;
    const i = O(
      rt(
        O(() => {
          const n = So(),
            o = bo();
          (t !== n || r !== o) && (s({ width: Number(o), height: Number(n) }), (t = n), (r = o));
        }),
        200,
      ),
    );
    return J("resize", i, e);
  }
  const Ph = ["INPUT", "TEXTAREA", "SELECT"],
    Di = new WeakMap();
  function Dh({
    inputCb: s,
    doc: e,
    mirror: t,
    blockClass: r,
    blockSelector: i,
    ignoreClass: n,
    ignoreSelector: o,
    maskInputOptions: l,
    maskInputFn: a,
    sampling: u,
    userTriggeredOnInput: c,
  }) {
    function h(S) {
      let y = at(S);
      const C = S.isTrusted,
        k = y && y.tagName;
      if (
        (y && k === "OPTION" && (y = v.parentElement(y)),
        !y || !k || Ph.indexOf(k) < 0 || X(y, r, i, !0) || y.classList.contains(n) || (o && y.matches(o)))
      )
        return;
      let L = y.value,
        V = !1;
      const M = hs(y) || "";
      M === "radio" || M === "checkbox"
        ? (V = y.checked)
        : (l[k.toLowerCase()] || l[M]) &&
          (L = cs({ element: y, maskInputOptions: l, tagName: k, type: M, value: L, maskInputFn: a })),
        m(y, c ? { text: L, isChecked: V, userTriggered: C } : { text: L, isChecked: V });
      const j = y.name;
      M === "radio" &&
        j &&
        V &&
        e.querySelectorAll(`input[type="radio"][name="${j}"]`).forEach((H) => {
          if (H !== y) {
            const Q = H.value;
            m(H, c ? { text: Q, isChecked: !V, userTriggered: !1 } : { text: Q, isChecked: !V });
          }
        });
    }
    function m(S, y) {
      const C = Di.get(S);
      if (!C || C.text !== y.text || C.isChecked !== y.isChecked) {
        Di.set(S, y);
        const k = t.getId(S);
        O(s)(q(x({}, y), { id: k }));
      }
    }
    const g = (u.input === "last" ? ["change"] : ["input", "change"]).map((S) => J(S, O(h), e)),
      p = e.defaultView;
    if (!p)
      return () => {
        g.forEach((S) => S());
      };
    const f = p.Object.getOwnPropertyDescriptor(p.HTMLInputElement.prototype, "value"),
      b = [
        [p.HTMLInputElement.prototype, "value"],
        [p.HTMLInputElement.prototype, "checked"],
        [p.HTMLSelectElement.prototype, "value"],
        [p.HTMLTextAreaElement.prototype, "value"],
        [p.HTMLSelectElement.prototype, "selectedIndex"],
        [p.HTMLOptionElement.prototype, "selected"],
      ];
    return (
      f &&
        f.set &&
        g.push(
          ...b.map((S) =>
            hr(
              S[0],
              S[1],
              {
                set() {
                  O(h)({ target: this, isTrusted: !1 });
                },
              },
              !1,
              p,
            ),
          ),
        ),
      O(() => {
        g.forEach((S) => S());
      })
    );
  }
  function qt(s) {
    const e = [];
    function t(r, i) {
      if (
        (kt("CSSGroupingRule") && r.parentRule instanceof CSSGroupingRule) ||
        (kt("CSSMediaRule") && r.parentRule instanceof CSSMediaRule) ||
        (kt("CSSSupportsRule") && r.parentRule instanceof CSSSupportsRule) ||
        (kt("CSSConditionRule") && r.parentRule instanceof CSSConditionRule)
      ) {
        const o = Array.from(r.parentRule.cssRules).indexOf(r);
        i.unshift(o);
      } else if (r.parentStyleSheet) {
        const o = Array.from(r.parentStyleSheet.cssRules).indexOf(r);
        i.unshift(o);
      }
      return i;
    }
    return t(s, e);
  }
  function de(s, e, t) {
    let r, i;
    return s ? (s.ownerNode ? (r = e.getId(s.ownerNode)) : (i = t.getId(s)), { styleId: i, id: r }) : {};
  }
  function Lh({ styleSheetRuleCb: s, mirror: e, stylesheetManager: t }, { win: r }) {
    if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype) return () => {};
    const i = r.CSSStyleSheet.prototype.insertRule;
    (r.CSSStyleSheet.prototype.insertRule = new Proxy(i, {
      apply: O((c, h, m) => {
        const [d, g] = m,
          { id: p, styleId: f } = de(h, e, t.styleMirror);
        return (
          ((p && p !== -1) || (f && f !== -1)) && s({ id: p, styleId: f, adds: [{ rule: d, index: g }] }), c.apply(h, m)
        );
      }),
    })),
      (r.CSSStyleSheet.prototype.addRule = function (c, h, m = this.cssRules.length) {
        const d = `${c} { ${h} }`;
        return r.CSSStyleSheet.prototype.insertRule.apply(this, [d, m]);
      });
    const n = r.CSSStyleSheet.prototype.deleteRule;
    (r.CSSStyleSheet.prototype.deleteRule = new Proxy(n, {
      apply: O((c, h, m) => {
        const [d] = m,
          { id: g, styleId: p } = de(h, e, t.styleMirror);
        return ((g && g !== -1) || (p && p !== -1)) && s({ id: g, styleId: p, removes: [{ index: d }] }), c.apply(h, m);
      }),
    })),
      (r.CSSStyleSheet.prototype.removeRule = function (c) {
        return r.CSSStyleSheet.prototype.deleteRule.apply(this, [c]);
      });
    let o;
    r.CSSStyleSheet.prototype.replace &&
      ((o = r.CSSStyleSheet.prototype.replace),
      (r.CSSStyleSheet.prototype.replace = new Proxy(o, {
        apply: O((c, h, m) => {
          const [d] = m,
            { id: g, styleId: p } = de(h, e, t.styleMirror);
          return ((g && g !== -1) || (p && p !== -1)) && s({ id: g, styleId: p, replace: d }), c.apply(h, m);
        }),
      })));
    let l;
    r.CSSStyleSheet.prototype.replaceSync &&
      ((l = r.CSSStyleSheet.prototype.replaceSync),
      (r.CSSStyleSheet.prototype.replaceSync = new Proxy(l, {
        apply: O((c, h, m) => {
          const [d] = m,
            { id: g, styleId: p } = de(h, e, t.styleMirror);
          return ((g && g !== -1) || (p && p !== -1)) && s({ id: g, styleId: p, replaceSync: d }), c.apply(h, m);
        }),
      })));
    const a = {};
    Pt("CSSGroupingRule")
      ? (a.CSSGroupingRule = r.CSSGroupingRule)
      : (Pt("CSSMediaRule") && (a.CSSMediaRule = r.CSSMediaRule),
        Pt("CSSConditionRule") && (a.CSSConditionRule = r.CSSConditionRule),
        Pt("CSSSupportsRule") && (a.CSSSupportsRule = r.CSSSupportsRule));
    const u = {};
    return (
      Object.entries(a).forEach(([c, h]) => {
        (u[c] = { insertRule: h.prototype.insertRule, deleteRule: h.prototype.deleteRule }),
          (h.prototype.insertRule = new Proxy(u[c].insertRule, {
            apply: O((m, d, g) => {
              const [p, f] = g,
                { id: b, styleId: S } = de(d.parentStyleSheet, e, t.styleMirror);
              return (
                ((b && b !== -1) || (S && S !== -1)) &&
                  s({ id: b, styleId: S, adds: [{ rule: p, index: [...qt(d), f || 0] }] }),
                m.apply(d, g)
              );
            }),
          })),
          (h.prototype.deleteRule = new Proxy(u[c].deleteRule, {
            apply: O((m, d, g) => {
              const [p] = g,
                { id: f, styleId: b } = de(d.parentStyleSheet, e, t.styleMirror);
              return (
                ((f && f !== -1) || (b && b !== -1)) && s({ id: f, styleId: b, removes: [{ index: [...qt(d), p] }] }),
                m.apply(d, g)
              );
            }),
          }));
      }),
      O(() => {
        (r.CSSStyleSheet.prototype.insertRule = i),
          (r.CSSStyleSheet.prototype.deleteRule = n),
          o && (r.CSSStyleSheet.prototype.replace = o),
          l && (r.CSSStyleSheet.prototype.replaceSync = l),
          Object.entries(a).forEach(([c, h]) => {
            (h.prototype.insertRule = u[c].insertRule), (h.prototype.deleteRule = u[c].deleteRule);
          });
      })
    );
  }
  function $o({ mirror: s, stylesheetManager: e }, t) {
    var r, i, n;
    let o = null;
    t.nodeName === "#document" ? (o = s.getId(t)) : (o = s.getId(v.host(t)));
    const l =
        t.nodeName === "#document"
          ? (r = t.defaultView) == null
            ? void 0
            : r.Document
          : (n = (i = t.ownerDocument) == null ? void 0 : i.defaultView) == null
            ? void 0
            : n.ShadowRoot,
      a =
        l != null && l.prototype
          ? Object.getOwnPropertyDescriptor(l == null ? void 0 : l.prototype, "adoptedStyleSheets")
          : void 0;
    return o === null || o === -1 || !l || !a
      ? () => {}
      : (Object.defineProperty(t, "adoptedStyleSheets", {
          configurable: a.configurable,
          enumerable: a.enumerable,
          get() {
            var u;
            return (u = a.get) == null ? void 0 : u.call(this);
          },
          set(u) {
            var c;
            const h = (c = a.set) == null ? void 0 : c.call(this, u);
            if (o !== null && o !== -1)
              try {
                e.adoptStyleSheets(u, o);
              } catch (m) {}
            return h;
          },
        }),
        O(() => {
          Object.defineProperty(t, "adoptedStyleSheets", {
            configurable: a.configurable,
            enumerable: a.enumerable,
            get: a.get,
            set: a.set,
          });
        }));
  }
  function Th({ styleDeclarationCb: s, mirror: e, ignoreCSSAttributes: t, stylesheetManager: r }, { win: i }) {
    const n = i.CSSStyleDeclaration.prototype.setProperty;
    i.CSSStyleDeclaration.prototype.setProperty = new Proxy(n, {
      apply: O((l, a, u) => {
        var c;
        const [h, m, d] = u;
        if (t.has(h)) return n.apply(a, [h, m, d]);
        const { id: g, styleId: p } = de((c = a.parentRule) == null ? void 0 : c.parentStyleSheet, e, r.styleMirror);
        return (
          ((g && g !== -1) || (p && p !== -1)) &&
            s({ id: g, styleId: p, set: { property: h, value: m, priority: d }, index: qt(a.parentRule) }),
          l.apply(a, u)
        );
      }),
    });
    const o = i.CSSStyleDeclaration.prototype.removeProperty;
    return (
      (i.CSSStyleDeclaration.prototype.removeProperty = new Proxy(o, {
        apply: O((l, a, u) => {
          var c;
          const [h] = u;
          if (t.has(h)) return o.apply(a, [h]);
          const { id: m, styleId: d } = de((c = a.parentRule) == null ? void 0 : c.parentStyleSheet, e, r.styleMirror);
          return (
            ((m && m !== -1) || (d && d !== -1)) &&
              s({ id: m, styleId: d, remove: { property: h }, index: qt(a.parentRule) }),
            l.apply(a, u)
          );
        }),
      })),
      O(() => {
        (i.CSSStyleDeclaration.prototype.setProperty = n), (i.CSSStyleDeclaration.prototype.removeProperty = o);
      })
    );
  }
  function _h({ mediaInteractionCb: s, blockClass: e, blockSelector: t, mirror: r, sampling: i, doc: n }) {
    const o = O((a) =>
        rt(
          O((u) => {
            const c = at(u);
            if (!c || X(c, e, t, !0)) return;
            const { currentTime: h, volume: m, muted: d, playbackRate: g, loop: p } = c;
            s({ type: a, id: r.getId(c), currentTime: h, volume: m, muted: d, playbackRate: g, loop: p });
          }),
          i.media || 500,
        ),
      ),
      l = [
        J("play", o(Me.Play), n),
        J("pause", o(Me.Pause), n),
        J("seeked", o(Me.Seeked), n),
        J("volumechange", o(Me.VolumeChange), n),
        J("ratechange", o(Me.RateChange), n),
      ];
    return O(() => {
      l.forEach((a) => a());
    });
  }
  function Fh({ fontCb: s, doc: e }) {
    const t = e.defaultView;
    if (!t) return () => {};
    const r = [],
      i = new WeakMap(),
      n = t.FontFace;
    t.FontFace = function (a, u, c) {
      const h = new n(a, u, c);
      return (
        i.set(h, {
          family: a,
          buffer: typeof u != "string",
          descriptors: c,
          fontSource: typeof u == "string" ? u : JSON.stringify(Array.from(new Uint8Array(u))),
        }),
        h
      );
    };
    const o = Fe(e.fonts, "add", function (l) {
      return function (a) {
        return (
          setTimeout(
            O(() => {
              const u = i.get(a);
              u && (s(u), i.delete(a));
            }),
            0,
          ),
          l.apply(this, [a])
        );
      };
    });
    return (
      r.push(() => {
        t.FontFace = n;
      }),
      r.push(o),
      O(() => {
        r.forEach((l) => l());
      })
    );
  }
  function Uh(s) {
    const { doc: e, mirror: t, blockClass: r, blockSelector: i, selectionCb: n } = s;
    let o = !0;
    const l = O(() => {
      const a = e.getSelection();
      if (!a || (o && a != null && a.isCollapsed)) return;
      o = a.isCollapsed || !1;
      const u = [],
        c = a.rangeCount || 0;
      for (let h = 0; h < c; h++) {
        const m = a.getRangeAt(h),
          { startContainer: d, startOffset: g, endContainer: p, endOffset: f } = m;
        X(d, r, i, !0) ||
          X(p, r, i, !0) ||
          u.push({ start: t.getId(d), startOffset: g, end: t.getId(p), endOffset: f });
      }
      n({ ranges: u });
    });
    return l(), J("selectionchange", l);
  }
  function Bh({ doc: s, customElementCb: e }) {
    const t = s.defaultView;
    return !t || !t.customElements
      ? () => {}
      : Fe(t.customElements, "define", function (i) {
          return function (n, o, l) {
            try {
              e({ define: { name: n } });
            } catch (a) {
              console.warn(`Custom element callback failed for ${n}`);
            }
            return i.apply(this, [n, o, l]);
          };
        });
  }
  function Wh(s, e) {
    const {
      mutationCb: t,
      mousemoveCb: r,
      mouseInteractionCb: i,
      scrollCb: n,
      viewportResizeCb: o,
      inputCb: l,
      mediaInteractionCb: a,
      styleSheetRuleCb: u,
      styleDeclarationCb: c,
      canvasMutationCb: h,
      fontCb: m,
      selectionCb: d,
      customElementCb: g,
    } = s;
    (s.mutationCb = (...p) => {
      e.mutation && e.mutation(...p), t(...p);
    }),
      (s.mousemoveCb = (...p) => {
        e.mousemove && e.mousemove(...p), r(...p);
      }),
      (s.mouseInteractionCb = (...p) => {
        e.mouseInteraction && e.mouseInteraction(...p), i(...p);
      }),
      (s.scrollCb = (...p) => {
        e.scroll && e.scroll(...p), n(...p);
      }),
      (s.viewportResizeCb = (...p) => {
        e.viewportResize && e.viewportResize(...p), o(...p);
      }),
      (s.inputCb = (...p) => {
        e.input && e.input(...p), l(...p);
      }),
      (s.mediaInteractionCb = (...p) => {
        e.mediaInteaction && e.mediaInteaction(...p), a(...p);
      }),
      (s.styleSheetRuleCb = (...p) => {
        e.styleSheetRule && e.styleSheetRule(...p), u(...p);
      }),
      (s.styleDeclarationCb = (...p) => {
        e.styleDeclaration && e.styleDeclaration(...p), c(...p);
      }),
      (s.canvasMutationCb = (...p) => {
        e.canvasMutation && e.canvasMutation(...p), h(...p);
      }),
      (s.fontCb = (...p) => {
        e.font && e.font(...p), m(...p);
      }),
      (s.selectionCb = (...p) => {
        e.selection && e.selection(...p), d(...p);
      }),
      (s.customElementCb = (...p) => {
        e.customElement && e.customElement(...p), g(...p);
      });
  }
  function zh(s, e = {}) {
    const t = s.doc.defaultView;
    if (!t) return () => {};
    Wh(s, e);
    let r;
    s.recordDOM && (r = Ao(s, s.doc));
    const i = $h(s),
      n = Nh(s),
      o = Eo(s),
      l = kh(s, { win: t }),
      a = Dh(s),
      u = _h(s);
    let c = () => {},
      h = () => {},
      m = () => {},
      d = () => {};
    s.recordDOM &&
      ((c = Lh(s, { win: t })), (h = $o(s, s.doc)), (m = Th(s, { win: t })), s.collectFonts && (d = Fh(s)));
    const g = Uh(s),
      p = Bh(s),
      f = [];
    for (const b of s.plugins) f.push(b.observer(b.callback, t, b.options));
    return O(() => {
      be.forEach((b) => b.reset()),
        r == null || r.disconnect(),
        i(),
        n(),
        o(),
        l(),
        a(),
        u(),
        c(),
        h(),
        m(),
        d(),
        g(),
        p(),
        f.forEach((b) => b());
    });
  }
  function kt(s) {
    return typeof window[s] != "undefined";
  }
  function Pt(s) {
    return !!(
      typeof window[s] != "undefined" &&
      window[s].prototype &&
      "insertRule" in window[s].prototype &&
      "deleteRule" in window[s].prototype
    );
  }
  class Li {
    constructor(e) {
      w(this, "iframeIdToRemoteIdMap", new WeakMap()),
        w(this, "iframeRemoteIdToIdMap", new WeakMap()),
        (this.generateIdFn = e);
    }
    getId(e, t, r, i) {
      const n = r || this.getIdToRemoteIdMap(e),
        o = i || this.getRemoteIdToIdMap(e);
      let l = n.get(t);
      return l || ((l = this.generateIdFn()), n.set(t, l), o.set(l, t)), l;
    }
    getIds(e, t) {
      const r = this.getIdToRemoteIdMap(e),
        i = this.getRemoteIdToIdMap(e);
      return t.map((n) => this.getId(e, n, r, i));
    }
    getRemoteId(e, t, r) {
      const i = r || this.getRemoteIdToIdMap(e);
      if (typeof t != "number") return t;
      const n = i.get(t);
      return n || -1;
    }
    getRemoteIds(e, t) {
      const r = this.getRemoteIdToIdMap(e);
      return t.map((i) => this.getRemoteId(e, i, r));
    }
    reset(e) {
      if (!e) {
        (this.iframeIdToRemoteIdMap = new WeakMap()), (this.iframeRemoteIdToIdMap = new WeakMap());
        return;
      }
      this.iframeIdToRemoteIdMap.delete(e), this.iframeRemoteIdToIdMap.delete(e);
    }
    getIdToRemoteIdMap(e) {
      let t = this.iframeIdToRemoteIdMap.get(e);
      return t || ((t = new Map()), this.iframeIdToRemoteIdMap.set(e, t)), t;
    }
    getRemoteIdToIdMap(e) {
      let t = this.iframeRemoteIdToIdMap.get(e);
      return t || ((t = new Map()), this.iframeRemoteIdToIdMap.set(e, t)), t;
    }
  }
  class Gh {
    constructor(e) {
      w(this, "iframes", new WeakMap()),
        w(this, "crossOriginIframeMap", new WeakMap()),
        w(this, "crossOriginIframeMirror", new Li(Hi)),
        w(this, "crossOriginIframeStyleMirror"),
        w(this, "crossOriginIframeRootIdMap", new WeakMap()),
        w(this, "mirror"),
        w(this, "mutationCb"),
        w(this, "wrappedEmit"),
        w(this, "loadListener"),
        w(this, "stylesheetManager"),
        w(this, "recordCrossOriginIframes"),
        (this.mutationCb = e.mutationCb),
        (this.wrappedEmit = e.wrappedEmit),
        (this.stylesheetManager = e.stylesheetManager),
        (this.recordCrossOriginIframes = e.recordCrossOriginIframes),
        (this.crossOriginIframeStyleMirror = new Li(
          this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror),
        )),
        (this.mirror = e.mirror),
        this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
    }
    addIframe(e) {
      this.iframes.set(e, !0), e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e);
    }
    addLoadListener(e) {
      this.loadListener = e;
    }
    attachIframe(e, t) {
      var r, i;
      this.mutationCb({
        adds: [{ parentId: this.mirror.getId(e), nextId: null, node: t }],
        removes: [],
        texts: [],
        attributes: [],
        isAttachIframe: !0,
      }),
        this.recordCrossOriginIframes &&
          ((r = e.contentWindow) == null || r.addEventListener("message", this.handleMessage.bind(this))),
        (i = this.loadListener) == null || i.call(this, e),
        e.contentDocument &&
          e.contentDocument.adoptedStyleSheets &&
          e.contentDocument.adoptedStyleSheets.length > 0 &&
          this.stylesheetManager.adoptStyleSheets(
            e.contentDocument.adoptedStyleSheets,
            this.mirror.getId(e.contentDocument),
          );
    }
    handleMessage(e) {
      const t = e;
      if (t.data.type !== "rrweb" || t.origin !== t.data.origin || !e.source) return;
      const i = this.crossOriginIframeMap.get(e.source);
      if (!i) return;
      const n = this.transformCrossOriginEvent(i, t.data.event);
      n && this.wrappedEmit(n, t.data.isCheckout);
    }
    transformCrossOriginEvent(e, t) {
      var r;
      switch (t.type) {
        case R.FullSnapshot: {
          this.crossOriginIframeMirror.reset(e),
            this.crossOriginIframeStyleMirror.reset(e),
            this.replaceIdOnNode(t.data.node, e);
          const i = t.data.node.id;
          return (
            this.crossOriginIframeRootIdMap.set(e, i),
            this.patchRootIdOnNode(t.data.node, i),
            {
              timestamp: t.timestamp,
              type: R.IncrementalSnapshot,
              data: {
                source: I.Mutation,
                adds: [{ parentId: this.mirror.getId(e), nextId: null, node: t.data.node }],
                removes: [],
                texts: [],
                attributes: [],
                isAttachIframe: !0,
              },
            }
          );
        }
        case R.Meta:
        case R.Load:
        case R.DomContentLoaded:
          return !1;
        case R.Plugin:
          return t;
        case R.Custom:
          return this.replaceIds(t.data.payload, e, ["id", "parentId", "previousId", "nextId"]), t;
        case R.IncrementalSnapshot:
          switch (t.data.source) {
            case I.Mutation:
              return (
                t.data.adds.forEach((i) => {
                  this.replaceIds(i, e, ["parentId", "nextId", "previousId"]), this.replaceIdOnNode(i.node, e);
                  const n = this.crossOriginIframeRootIdMap.get(e);
                  n && this.patchRootIdOnNode(i.node, n);
                }),
                t.data.removes.forEach((i) => {
                  this.replaceIds(i, e, ["parentId", "id"]);
                }),
                t.data.attributes.forEach((i) => {
                  this.replaceIds(i, e, ["id"]);
                }),
                t.data.texts.forEach((i) => {
                  this.replaceIds(i, e, ["id"]);
                }),
                t
              );
            case I.Drag:
            case I.TouchMove:
            case I.MouseMove:
              return (
                t.data.positions.forEach((i) => {
                  this.replaceIds(i, e, ["id"]);
                }),
                t
              );
            case I.ViewportResize:
              return !1;
            case I.MediaInteraction:
            case I.MouseInteraction:
            case I.Scroll:
            case I.CanvasMutation:
            case I.Input:
              return this.replaceIds(t.data, e, ["id"]), t;
            case I.StyleSheetRule:
            case I.StyleDeclaration:
              return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleId"]), t;
            case I.Font:
              return t;
            case I.Selection:
              return (
                t.data.ranges.forEach((i) => {
                  this.replaceIds(i, e, ["start", "end"]);
                }),
                t
              );
            case I.AdoptedStyleSheet:
              return (
                this.replaceIds(t.data, e, ["id"]),
                this.replaceStyleIds(t.data, e, ["styleIds"]),
                (r = t.data.styles) == null ||
                  r.forEach((i) => {
                    this.replaceStyleIds(i, e, ["styleId"]);
                  }),
                t
              );
          }
      }
      return !1;
    }
    replace(e, t, r, i) {
      for (const n of i)
        (!Array.isArray(t[n]) && typeof t[n] != "number") ||
          (Array.isArray(t[n]) ? (t[n] = e.getIds(r, t[n])) : (t[n] = e.getId(r, t[n])));
      return t;
    }
    replaceIds(e, t, r) {
      return this.replace(this.crossOriginIframeMirror, e, t, r);
    }
    replaceStyleIds(e, t, r) {
      return this.replace(this.crossOriginIframeStyleMirror, e, t, r);
    }
    replaceIdOnNode(e, t) {
      this.replaceIds(e, t, ["id", "rootId"]),
        "childNodes" in e &&
          e.childNodes.forEach((r) => {
            this.replaceIdOnNode(r, t);
          });
    }
    patchRootIdOnNode(e, t) {
      e.type !== G.Document && !e.rootId && (e.rootId = t),
        "childNodes" in e &&
          e.childNodes.forEach((r) => {
            this.patchRootIdOnNode(r, t);
          });
    }
  }
  class Vh {
    constructor(e) {
      w(this, "shadowDoms", new WeakSet()),
        w(this, "mutationCb"),
        w(this, "scrollCb"),
        w(this, "bypassOptions"),
        w(this, "mirror"),
        w(this, "restoreHandlers", []),
        (this.mutationCb = e.mutationCb),
        (this.scrollCb = e.scrollCb),
        (this.bypassOptions = e.bypassOptions),
        (this.mirror = e.mirror),
        this.init();
    }
    init() {
      this.reset(), this.patchAttachShadow(Element, document);
    }
    addShadowRoot(e, t) {
      if (!je(e) || this.shadowDoms.has(e)) return;
      this.shadowDoms.add(e);
      const r = Ao(
        q(x({}, this.bypassOptions), {
          doc: t,
          mutationCb: this.mutationCb,
          mirror: this.mirror,
          shadowDomManager: this,
        }),
        e,
      );
      this.restoreHandlers.push(() => r.disconnect()),
        this.restoreHandlers.push(
          Eo(q(x({}, this.bypassOptions), { scrollCb: this.scrollCb, doc: e, mirror: this.mirror })),
        ),
        setTimeout(() => {
          e.adoptedStyleSheets &&
            e.adoptedStyleSheets.length > 0 &&
            this.bypassOptions.stylesheetManager.adoptStyleSheets(e.adoptedStyleSheets, this.mirror.getId(v.host(e))),
            this.restoreHandlers.push(
              $o({ mirror: this.mirror, stylesheetManager: this.bypassOptions.stylesheetManager }, e),
            );
        }, 0);
    }
    observeAttachShadow(e) {
      !e.contentWindow || !e.contentDocument || this.patchAttachShadow(e.contentWindow.Element, e.contentDocument);
    }
    patchAttachShadow(e, t) {
      const r = this;
      this.restoreHandlers.push(
        Fe(e.prototype, "attachShadow", function (i) {
          return function (n) {
            const o = i.call(this, n),
              l = v.shadowRoot(this);
            return l && Ro(this) && r.addShadowRoot(l, t), o;
          };
        }),
      );
    }
    reset() {
      this.restoreHandlers.forEach((e) => {
        try {
          e();
        } catch (t) {}
      }),
        (this.restoreHandlers = []),
        (this.shadowDoms = new WeakSet());
    }
  }
  var $e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    jh = typeof Uint8Array == "undefined" ? [] : new Uint8Array(256);
  for (var Dt = 0; Dt < $e.length; Dt++) jh[$e.charCodeAt(Dt)] = Dt;
  var Hh = function (s) {
    var e = new Uint8Array(s),
      t,
      r = e.length,
      i = "";
    for (t = 0; t < r; t += 3)
      (i += $e[e[t] >> 2]),
        (i += $e[((e[t] & 3) << 4) | (e[t + 1] >> 4)]),
        (i += $e[((e[t + 1] & 15) << 2) | (e[t + 2] >> 6)]),
        (i += $e[e[t + 2] & 63]);
    return (
      r % 3 === 2 ? (i = i.substring(0, i.length - 1) + "=") : r % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="),
      i
    );
  };
  const Ti = new Map();
  function Yh(s, e) {
    let t = Ti.get(s);
    return t || ((t = new Map()), Ti.set(s, t)), t.has(e) || t.set(e, []), t.get(e);
  }
  const No = (s, e, t) => {
    if (!s || !(Po(s, e) || typeof s == "object")) return;
    const r = s.constructor.name,
      i = Yh(t, r);
    let n = i.indexOf(s);
    return n === -1 && ((n = i.length), i.push(s)), n;
  };
  function Ut(s, e, t) {
    if (s instanceof Array) return s.map((r) => Ut(r, e, t));
    if (s === null) return s;
    if (
      s instanceof Float32Array ||
      s instanceof Float64Array ||
      s instanceof Int32Array ||
      s instanceof Uint32Array ||
      s instanceof Uint8Array ||
      s instanceof Uint16Array ||
      s instanceof Int16Array ||
      s instanceof Int8Array ||
      s instanceof Uint8ClampedArray
    )
      return { rr_type: s.constructor.name, args: [Object.values(s)] };
    if (s instanceof ArrayBuffer) {
      const r = s.constructor.name,
        i = Hh(s);
      return { rr_type: r, base64: i };
    } else {
      if (s instanceof DataView)
        return { rr_type: s.constructor.name, args: [Ut(s.buffer, e, t), s.byteOffset, s.byteLength] };
      if (s instanceof HTMLImageElement) {
        const r = s.constructor.name,
          { src: i } = s;
        return { rr_type: r, src: i };
      } else if (s instanceof HTMLCanvasElement) {
        const r = "HTMLImageElement",
          i = s.toDataURL();
        return { rr_type: r, src: i };
      } else {
        if (s instanceof ImageData) return { rr_type: s.constructor.name, args: [Ut(s.data, e, t), s.width, s.height] };
        if (Po(s, e) || typeof s == "object") {
          const r = s.constructor.name,
            i = No(s, e, t);
          return { rr_type: r, index: i };
        }
      }
    }
    return s;
  }
  const ko = (s, e, t) => s.map((r) => Ut(r, e, t)),
    Po = (s, e) =>
      !![
        "WebGLActiveInfo",
        "WebGLBuffer",
        "WebGLFramebuffer",
        "WebGLProgram",
        "WebGLRenderbuffer",
        "WebGLShader",
        "WebGLShaderPrecisionFormat",
        "WebGLTexture",
        "WebGLUniformLocation",
        "WebGLVertexArrayObject",
        "WebGLVertexArrayObjectOES",
      ]
        .filter((i) => typeof e[i] == "function")
        .find((i) => s instanceof e[i]);
  function Zh(s, e, t, r) {
    const i = [],
      n = Object.getOwnPropertyNames(e.CanvasRenderingContext2D.prototype);
    for (const o of n)
      try {
        if (typeof e.CanvasRenderingContext2D.prototype[o] != "function") continue;
        const l = Fe(e.CanvasRenderingContext2D.prototype, o, function (a) {
          return function (...u) {
            return (
              X(this.canvas, t, r, !0) ||
                setTimeout(() => {
                  const c = ko(u, e, this);
                  s(this.canvas, { type: _e["2D"], property: o, args: c });
                }, 0),
              a.apply(this, u)
            );
          };
        });
        i.push(l);
      } catch (l) {
        const a = hr(e.CanvasRenderingContext2D.prototype, o, {
          set(u) {
            s(this.canvas, { type: _e["2D"], property: o, args: [u], setter: !0 });
          },
        });
        i.push(a);
      }
    return () => {
      i.forEach((o) => o());
    };
  }
  function Jh(s) {
    return s === "experimental-webgl" ? "webgl" : s;
  }
  function _i(s, e, t, r) {
    const i = [];
    try {
      const n = Fe(s.HTMLCanvasElement.prototype, "getContext", function (o) {
        return function (l, ...a) {
          if (!X(this, e, t, !0)) {
            const u = Jh(l);
            if (("__context" in this || (this.__context = u), r && ["webgl", "webgl2"].includes(u)))
              if (a[0] && typeof a[0] == "object") {
                const c = a[0];
                c.preserveDrawingBuffer || (c.preserveDrawingBuffer = !0);
              } else a.splice(0, 1, { preserveDrawingBuffer: !0 });
          }
          return o.apply(this, [l, ...a]);
        };
      });
      i.push(n);
    } catch (n) {
      console.error("failed to patch HTMLCanvasElement.prototype.getContext");
    }
    return () => {
      i.forEach((n) => n());
    };
  }
  function Fi(s, e, t, r, i, n) {
    const o = [],
      l = Object.getOwnPropertyNames(s);
    for (const a of l)
      if (!["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(a))
        try {
          if (typeof s[a] != "function") continue;
          const u = Fe(s, a, function (c) {
            return function (...h) {
              const m = c.apply(this, h);
              if ((No(m, n, this), "tagName" in this.canvas && !X(this.canvas, r, i, !0))) {
                const d = ko(h, n, this),
                  g = { type: e, property: a, args: d };
                t(this.canvas, g);
              }
              return m;
            };
          });
          o.push(u);
        } catch (u) {
          const c = hr(s, a, {
            set(h) {
              t(this.canvas, { type: e, property: a, args: [h], setter: !0 });
            },
          });
          o.push(c);
        }
    return o;
  }
  function Xh(s, e, t, r) {
    const i = [];
    return (
      i.push(...Fi(e.WebGLRenderingContext.prototype, _e.WebGL, s, t, r, e)),
      typeof e.WebGL2RenderingContext != "undefined" &&
        i.push(...Fi(e.WebGL2RenderingContext.prototype, _e.WebGL2, s, t, r, e)),
      () => {
        i.forEach((n) => n());
      }
    );
  }
  const Do =
      "KGZ1bmN0aW9uKCkgewogICJ1c2Ugc3RyaWN0IjsKICB2YXIgY2hhcnMgPSAiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyI7CiAgdmFyIGxvb2t1cCA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAidW5kZWZpbmVkIiA/IFtdIDogbmV3IFVpbnQ4QXJyYXkoMjU2KTsKICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7CiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpOwogIH0KICB2YXIgZW5jb2RlID0gZnVuY3Rpb24oYXJyYXlidWZmZXIpIHsKICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSwgaTIsIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gIiI7CiAgICBmb3IgKGkyID0gMDsgaTIgPCBsZW47IGkyICs9IDMpIHsKICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kyXSA+PiAyXTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMl0gJiAzKSA8PCA0IHwgYnl0ZXNbaTIgKyAxXSA+PiA0XTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMiArIDFdICYgMTUpIDw8IDIgfCBieXRlc1tpMiArIDJdID4+IDZdOwogICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaTIgKyAyXSAmIDYzXTsKICAgIH0KICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgIj0iOwogICAgfSBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgIj09IjsKICAgIH0KICAgIHJldHVybiBiYXNlNjQ7CiAgfTsKICBjb25zdCBsYXN0QmxvYk1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7CiAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTsKICBhc3luYyBmdW5jdGlvbiBnZXRUcmFuc3BhcmVudEJsb2JGb3Iod2lkdGgsIGhlaWdodCwgZGF0YVVSTE9wdGlvbnMpIHsKICAgIGNvbnN0IGlkID0gYCR7d2lkdGh9LSR7aGVpZ2h0fWA7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBpZiAodHJhbnNwYXJlbnRCbG9iTWFwLmhhcyhpZCkpIHJldHVybiB0cmFuc3BhcmVudEJsb2JNYXAuZ2V0KGlkKTsKICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsKICAgICAgb2Zmc2NyZWVuLmdldENvbnRleHQoIjJkIik7CiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBvZmZzY3JlZW4uY29udmVydFRvQmxvYihkYXRhVVJMT3B0aW9ucyk7CiAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpOwogICAgICBjb25zdCBiYXNlNjQgPSBlbmNvZGUoYXJyYXlCdWZmZXIpOwogICAgICB0cmFuc3BhcmVudEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICByZXR1cm4gYmFzZTY0OwogICAgfSBlbHNlIHsKICAgICAgcmV0dXJuICIiOwogICAgfQogIH0KICBjb25zdCB3b3JrZXIgPSBzZWxmOwogIHdvcmtlci5vbm1lc3NhZ2UgPSBhc3luYyBmdW5jdGlvbihlKSB7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBjb25zdCB7IGlkLCBiaXRtYXAsIHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zIH0gPSBlLmRhdGE7CiAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKAogICAgICAgIHdpZHRoLAogICAgICAgIGhlaWdodCwKICAgICAgICBkYXRhVVJMT3B0aW9ucwogICAgICApOwogICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOwogICAgICBjb25zdCBjdHggPSBvZmZzY3JlZW4uZ2V0Q29udGV4dCgiMmQiKTsKICAgICAgY3R4LmRyYXdJbWFnZShiaXRtYXAsIDAsIDApOwogICAgICBiaXRtYXAuY2xvc2UoKTsKICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IG9mZnNjcmVlbi5jb252ZXJ0VG9CbG9iKGRhdGFVUkxPcHRpb25zKTsKICAgICAgY29uc3QgdHlwZSA9IGJsb2IudHlwZTsKICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCBibG9iLmFycmF5QnVmZmVyKCk7CiAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7CiAgICAgIGlmICghbGFzdEJsb2JNYXAuaGFzKGlkKSAmJiBhd2FpdCB0cmFuc3BhcmVudEJhc2U2NCA9PT0gYmFzZTY0KSB7CiAgICAgICAgbGFzdEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICAgIHJldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UoeyBpZCB9KTsKICAgICAgfQogICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KSByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7CiAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7CiAgICAgICAgaWQsCiAgICAgICAgdHlwZSwKICAgICAgICBiYXNlNjQsCiAgICAgICAgd2lkdGgsCiAgICAgICAgaGVpZ2h0CiAgICAgIH0pOwogICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7CiAgICB9IGVsc2UgewogICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsKICAgIH0KICB9Owp9KSgpOwovLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS1iaXRtYXAtZGF0YS11cmwtd29ya2VyLUlKcEM3Z19iLmpzLm1hcAo=",
    Kh = (s) => Uint8Array.from(atob(s), (e) => e.charCodeAt(0)),
    Ui = typeof window != "undefined" && window.Blob && new Blob([Kh(Do)], { type: "text/javascript;charset=utf-8" });
  function Qh(s) {
    let e;
    try {
      if (((e = Ui && (window.URL || window.webkitURL).createObjectURL(Ui)), !e)) throw "";
      const t = new Worker(e, { name: s == null ? void 0 : s.name });
      return (
        t.addEventListener("error", () => {
          (window.URL || window.webkitURL).revokeObjectURL(e);
        }),
        t
      );
    } catch (t) {
      return new Worker("data:text/javascript;base64," + Do, { name: s == null ? void 0 : s.name });
    } finally {
      e && (window.URL || window.webkitURL).revokeObjectURL(e);
    }
  }
  class qh {
    constructor(e) {
      w(this, "pendingCanvasMutations", new Map()),
        w(this, "rafStamps", { latestId: 0, invokeId: null }),
        w(this, "mirror"),
        w(this, "mutationCb"),
        w(this, "resetObservers"),
        w(this, "frozen", !1),
        w(this, "locked", !1),
        w(this, "processMutation", (a, u) => {
          ((this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId) ||
            !this.rafStamps.invokeId) &&
            (this.rafStamps.invokeId = this.rafStamps.latestId),
            this.pendingCanvasMutations.has(a) || this.pendingCanvasMutations.set(a, []),
            this.pendingCanvasMutations.get(a).push(u);
        });
      const { sampling: t = "all", win: r, blockClass: i, blockSelector: n, recordCanvas: o, dataURLOptions: l } = e;
      (this.mutationCb = e.mutationCb),
        (this.mirror = e.mirror),
        o && t === "all" && this.initCanvasMutationObserver(r, i, n),
        o && typeof t == "number" && this.initCanvasFPSObserver(t, r, i, n, { dataURLOptions: l });
    }
    reset() {
      this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers();
    }
    freeze() {
      this.frozen = !0;
    }
    unfreeze() {
      this.frozen = !1;
    }
    lock() {
      this.locked = !0;
    }
    unlock() {
      this.locked = !1;
    }
    initCanvasFPSObserver(e, t, r, i, n) {
      const o = _i(t, r, i, !0),
        l = new Map(),
        a = new Qh();
      a.onmessage = (g) => {
        const { id: p } = g.data;
        if ((l.set(p, !1), !("base64" in g.data))) return;
        const { base64: f, type: b, width: S, height: y } = g.data;
        this.mutationCb({
          id: p,
          type: _e["2D"],
          commands: [
            { property: "clearRect", args: [0, 0, S, y] },
            {
              property: "drawImage",
              args: [
                {
                  rr_type: "ImageBitmap",
                  args: [{ rr_type: "Blob", data: [{ rr_type: "ArrayBuffer", base64: f }], type: b }],
                },
                0,
                0,
              ],
            },
          ],
        });
      };
      const u = 1e3 / e;
      let c = 0,
        h;
      const m = () => {
          const g = [];
          return (
            t.document.querySelectorAll("canvas").forEach((p) => {
              X(p, r, i, !0) || g.push(p);
            }),
            g
          );
        },
        d = (g) => {
          if (c && g - c < u) {
            h = requestAnimationFrame(d);
            return;
          }
          (c = g),
            m().forEach(async (p) => {
              var f;
              const b = this.mirror.getId(p);
              if (l.get(b) || p.width === 0 || p.height === 0) return;
              if ((l.set(b, !0), ["webgl", "webgl2"].includes(p.__context))) {
                const y = p.getContext(p.__context);
                ((f = y == null ? void 0 : y.getContextAttributes()) == null ? void 0 : f.preserveDrawingBuffer) ===
                  !1 && y.clear(y.COLOR_BUFFER_BIT);
              }
              const S = await createImageBitmap(p);
              a.postMessage({ id: b, bitmap: S, width: p.width, height: p.height, dataURLOptions: n.dataURLOptions }, [
                S,
              ]);
            }),
            (h = requestAnimationFrame(d));
        };
      (h = requestAnimationFrame(d)),
        (this.resetObservers = () => {
          o(), cancelAnimationFrame(h);
        });
    }
    initCanvasMutationObserver(e, t, r) {
      this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
      const i = _i(e, t, r, !1),
        n = Zh(this.processMutation.bind(this), e, t, r),
        o = Xh(this.processMutation.bind(this), e, t, r);
      this.resetObservers = () => {
        i(), n(), o();
      };
    }
    startPendingCanvasMutationFlusher() {
      requestAnimationFrame(() => this.flushPendingCanvasMutations());
    }
    startRAFTimestamping() {
      const e = (t) => {
        (this.rafStamps.latestId = t), requestAnimationFrame(e);
      };
      requestAnimationFrame(e);
    }
    flushPendingCanvasMutations() {
      this.pendingCanvasMutations.forEach((e, t) => {
        const r = this.mirror.getId(t);
        this.flushPendingCanvasMutationFor(t, r);
      }),
        requestAnimationFrame(() => this.flushPendingCanvasMutations());
    }
    flushPendingCanvasMutationFor(e, t) {
      if (this.frozen || this.locked) return;
      const r = this.pendingCanvasMutations.get(e);
      if (!r || t === -1) return;
      const i = r.map((o) => {
          const u = o,
            { type: l } = u;
          return xe(u, ["type"]);
        }),
        { type: n } = r[0];
      this.mutationCb({ id: t, type: n, commands: i }), this.pendingCanvasMutations.delete(e);
    }
  }
  class ef {
    constructor(e) {
      w(this, "trackedLinkElements", new WeakSet()),
        w(this, "mutationCb"),
        w(this, "adoptedStyleSheetCb"),
        w(this, "styleMirror", new vh()),
        (this.mutationCb = e.mutationCb),
        (this.adoptedStyleSheetCb = e.adoptedStyleSheetCb);
    }
    attachLinkElement(e, t) {
      "_cssText" in t.attributes &&
        this.mutationCb({ adds: [], removes: [], texts: [], attributes: [{ id: t.id, attributes: t.attributes }] }),
        this.trackLinkElement(e);
    }
    trackLinkElement(e) {
      this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e));
    }
    adoptStyleSheets(e, t) {
      if (e.length === 0) return;
      const r = { id: t, styleIds: [] },
        i = [];
      for (const n of e) {
        let o;
        this.styleMirror.has(n)
          ? (o = this.styleMirror.getId(n))
          : ((o = this.styleMirror.add(n)),
            i.push({
              styleId: o,
              rules: Array.from(n.rules || CSSRule, (l, a) => ({ rule: Gi(l, n.href), index: a })),
            })),
          r.styleIds.push(o);
      }
      i.length > 0 && (r.styles = i), this.adoptedStyleSheetCb(r);
    }
    reset() {
      this.styleMirror.reset(), (this.trackedLinkElements = new WeakSet());
    }
    trackStylesheetInLinkElement(e) {}
  }
  class tf {
    constructor() {
      w(this, "nodeMap", new WeakMap()), w(this, "active", !1);
    }
    inOtherBuffer(e, t) {
      const r = this.nodeMap.get(e);
      return r && Array.from(r).some((i) => i !== t);
    }
    add(e, t) {
      this.active ||
        ((this.active = !0),
        requestAnimationFrame(() => {
          (this.nodeMap = new WeakMap()), (this.active = !1);
        })),
        this.nodeMap.set(e, (this.nodeMap.get(e) || new Set()).add(t));
    }
    destroy() {}
  }
  let z,
    Bt,
    Er,
    er = !1;
  try {
    if (Array.from([1], (s) => s * 2)[0] !== 2) {
      const s = document.createElement("iframe");
      document.body.appendChild(s),
        (Array.from = ((zs = s.contentWindow) == null ? void 0 : zs.Array.from) || Array.from),
        document.body.removeChild(s);
    }
  } catch (s) {
    console.debug("Unable to override Array.from", s);
  }
  const se = oa();
  function lt(s = {}) {
    const {
      emit: e,
      checkoutEveryNms: t,
      checkoutEveryNth: r,
      blockClass: i = "rr-block",
      blockSelector: n = null,
      ignoreClass: o = "rr-ignore",
      ignoreSelector: l = null,
      maskTextClass: a = "rr-mask",
      maskTextSelector: u = null,
      inlineStylesheet: c = !0,
      maskAllInputs: h,
      maskInputOptions: m,
      slimDOMOptions: d,
      maskInputFn: g,
      maskTextFn: p,
      hooks: f,
      packFn: b,
      sampling: S = {},
      dataURLOptions: y = {},
      mousemoveWait: C,
      recordDOM: k = !0,
      recordCanvas: L = !1,
      recordCrossOriginIframes: V = !1,
      recordAfter: M = s.recordAfter === "DOMContentLoaded" ? s.recordAfter : "load",
      userTriggeredOnInput: j = !1,
      collectFonts: H = !1,
      inlineImages: Q = !1,
      plugins: A,
      keepIframeSrcFn: ye = () => !1,
      ignoreCSSAttributes: Ue = new Set([]),
      errorHandler: Z,
    } = s;
    Ah(Z);
    const te = V ? window.parent === window : !0;
    let ce = !1;
    if (!te)
      try {
        window.parent.document && (ce = !1);
      } catch (E) {
        ce = !0;
      }
    if (te && !e) throw new Error("emit function is required");
    if (!te && !ce) return () => {};
    C !== void 0 && S.mousemove === void 0 && (S.mousemove = C), se.reset();
    const oe =
        h === !0
          ? {
              color: !0,
              date: !0,
              "datetime-local": !0,
              email: !0,
              month: !0,
              number: !0,
              range: !0,
              search: !0,
              tel: !0,
              text: !0,
              time: !0,
              url: !0,
              week: !0,
              textarea: !0,
              select: !0,
              password: !0,
            }
          : m !== void 0
            ? m
            : { password: !0 },
      fr =
        d === !0 || d === "all"
          ? {
              script: !0,
              comment: !0,
              headFavicon: !0,
              headWhitespace: !0,
              headMetaSocial: !0,
              headMetaRobots: !0,
              headMetaHttpEquiv: !0,
              headMetaVerification: !0,
              headMetaAuthorship: d === "all",
              headMetaDescKeywords: d === "all",
              headTitleMutations: d === "all",
            }
          : d || {};
    Ch();
    let Ls,
      pr = 0;
    const Ts = (E) => {
      for (const re of A || []) re.eventProcessor && (E = re.eventProcessor(E));
      return b && !ce && (E = b(E)), E;
    };
    z = (E, re) => {
      var B;
      const W = E;
      if (
        ((W.timestamp = Qt()),
        (B = be[0]) != null &&
          B.isFrozen() &&
          W.type !== R.FullSnapshot &&
          !(W.type === R.IncrementalSnapshot && W.data.source === I.Mutation) &&
          be.forEach((ae) => ae.unfreeze()),
        te)
      )
        e == null || e(Ts(W), re);
      else if (ce) {
        const ae = { type: "rrweb", event: Ts(W), origin: window.location.origin, isCheckout: re };
        window.parent.postMessage(ae, "*");
      }
      if (W.type === R.FullSnapshot) (Ls = W), (pr = 0);
      else if (W.type === R.IncrementalSnapshot) {
        if (W.data.source === I.Mutation && W.data.isAttachIframe) return;
        pr++;
        const ae = r && pr >= r,
          P = t && W.timestamp - Ls.timestamp > t;
        (ae || P) && Bt(!0);
      }
    };
    const ut = (E) => {
        z({ type: R.IncrementalSnapshot, data: x({ source: I.Mutation }, E) });
      },
      _s = (E) => z({ type: R.IncrementalSnapshot, data: x({ source: I.Scroll }, E) }),
      Fs = (E) => z({ type: R.IncrementalSnapshot, data: x({ source: I.CanvasMutation }, E) }),
      Lo = (E) => z({ type: R.IncrementalSnapshot, data: x({ source: I.AdoptedStyleSheet }, E) }),
      we = new ef({ mutationCb: ut, adoptedStyleSheetCb: Lo }),
      Se = new Gh({ mirror: se, mutationCb: ut, stylesheetManager: we, recordCrossOriginIframes: V, wrappedEmit: z });
    for (const E of A || [])
      E.getMirror &&
        E.getMirror({
          nodeMirror: se,
          crossOriginIframeMirror: Se.crossOriginIframeMirror,
          crossOriginIframeStyleMirror: Se.crossOriginIframeStyleMirror,
        });
    const dr = new tf();
    Er = new qh({
      recordCanvas: L,
      mutationCb: Fs,
      win: window,
      blockClass: i,
      blockSelector: n,
      mirror: se,
      sampling: S.canvas,
      dataURLOptions: y,
    });
    const ct = new Vh({
      mutationCb: ut,
      scrollCb: _s,
      bypassOptions: {
        blockClass: i,
        blockSelector: n,
        maskTextClass: a,
        maskTextSelector: u,
        inlineStylesheet: c,
        maskInputOptions: oe,
        dataURLOptions: y,
        maskTextFn: p,
        maskInputFn: g,
        recordCanvas: L,
        inlineImages: Q,
        sampling: S,
        slimDOMOptions: fr,
        iframeManager: Se,
        stylesheetManager: we,
        canvasManager: Er,
        keepIframeSrcFn: ye,
        processedNodeManager: dr,
      },
      mirror: se,
    });
    Bt = (E = !1) => {
      if (!k) return;
      z({ type: R.Meta, data: { href: window.location.href, width: bo(), height: So() } }, E),
        we.reset(),
        ct.init(),
        be.forEach((B) => B.lock());
      const re = Aa(document, {
        mirror: se,
        blockClass: i,
        blockSelector: n,
        maskTextClass: a,
        maskTextSelector: u,
        inlineStylesheet: c,
        maskAllInputs: oe,
        maskTextFn: p,
        maskInputFn: g,
        slimDOM: fr,
        dataURLOptions: y,
        recordCanvas: L,
        inlineImages: Q,
        onSerialize: (B) => {
          Io(B, se) && Se.addIframe(B),
            xo(B, se) && we.trackLinkElement(B),
            as(B) && ct.addShadowRoot(v.shadowRoot(B), document);
        },
        onIframeLoad: (B, W) => {
          Se.attachIframe(B, W), ct.observeAttachShadow(B);
        },
        onStylesheetLoad: (B, W) => {
          we.attachLinkElement(B, W);
        },
        keepIframeSrcFn: ye,
      });
      if (!re) return console.warn("Failed to snapshot the document");
      z({ type: R.FullSnapshot, data: { node: re, initialOffset: wo(window) } }, E),
        be.forEach((B) => B.unlock()),
        document.adoptedStyleSheets &&
          document.adoptedStyleSheets.length > 0 &&
          we.adoptStyleSheets(document.adoptedStyleSheets, se.getId(document));
    };
    try {
      const E = [],
        re = (W) => {
          var ae;
          return O(zh)(
            {
              mutationCb: ut,
              mousemoveCb: (P, mr) => z({ type: R.IncrementalSnapshot, data: { source: mr, positions: P } }),
              mouseInteractionCb: (P) => z({ type: R.IncrementalSnapshot, data: x({ source: I.MouseInteraction }, P) }),
              scrollCb: _s,
              viewportResizeCb: (P) => z({ type: R.IncrementalSnapshot, data: x({ source: I.ViewportResize }, P) }),
              inputCb: (P) => z({ type: R.IncrementalSnapshot, data: x({ source: I.Input }, P) }),
              mediaInteractionCb: (P) => z({ type: R.IncrementalSnapshot, data: x({ source: I.MediaInteraction }, P) }),
              styleSheetRuleCb: (P) => z({ type: R.IncrementalSnapshot, data: x({ source: I.StyleSheetRule }, P) }),
              styleDeclarationCb: (P) => z({ type: R.IncrementalSnapshot, data: x({ source: I.StyleDeclaration }, P) }),
              canvasMutationCb: Fs,
              fontCb: (P) => z({ type: R.IncrementalSnapshot, data: x({ source: I.Font }, P) }),
              selectionCb: (P) => {
                z({ type: R.IncrementalSnapshot, data: x({ source: I.Selection }, P) });
              },
              customElementCb: (P) => {
                z({ type: R.IncrementalSnapshot, data: x({ source: I.CustomElement }, P) });
              },
              blockClass: i,
              ignoreClass: o,
              ignoreSelector: l,
              maskTextClass: a,
              maskTextSelector: u,
              maskInputOptions: oe,
              inlineStylesheet: c,
              sampling: S,
              recordDOM: k,
              recordCanvas: L,
              inlineImages: Q,
              userTriggeredOnInput: j,
              collectFonts: H,
              doc: W,
              maskInputFn: g,
              maskTextFn: p,
              keepIframeSrcFn: ye,
              blockSelector: n,
              slimDOMOptions: fr,
              dataURLOptions: y,
              mirror: se,
              iframeManager: Se,
              stylesheetManager: we,
              shadowDomManager: ct,
              processedNodeManager: dr,
              canvasManager: Er,
              ignoreCSSAttributes: Ue,
              plugins:
                ((ae = A == null ? void 0 : A.filter((P) => P.observer)) == null
                  ? void 0
                  : ae.map((P) => ({
                      observer: P.observer,
                      options: P.options,
                      callback: (mr) => z({ type: R.Plugin, data: { plugin: P.name, payload: mr } }),
                    }))) || [],
            },
            f,
          );
        };
      Se.addLoadListener((W) => {
        try {
          E.push(re(W.contentDocument));
        } catch (ae) {
          console.warn(ae);
        }
      });
      const B = () => {
        Bt(), E.push(re(document)), (er = !0);
      };
      return (
        document.readyState === "interactive" || document.readyState === "complete"
          ? B()
          : (E.push(
              J("DOMContentLoaded", () => {
                z({ type: R.DomContentLoaded, data: {} }), M === "DOMContentLoaded" && B();
              }),
            ),
            E.push(
              J(
                "load",
                () => {
                  z({ type: R.Load, data: {} }), M === "load" && B();
                },
                window,
              ),
            )),
        () => {
          E.forEach((W) => W()), dr.destroy(), (er = !1), Eh();
        }
      );
    } catch (E) {
      console.warn(E);
    }
  }
  lt.addCustomEvent = (s, e) => {
    if (!er) throw new Error("please add custom event after start recording");
    z({ type: R.Custom, data: { tag: s, payload: e } });
  };
  lt.freezePage = () => {
    be.forEach((s) => s.freeze());
  };
  lt.takeFullSnapshot = (s) => {
    if (!er) throw new Error("please take full snapshot after start recording");
    Bt(s);
  };
  lt.mirror = se;
  var Bi;
  (function (s) {
    (s[(s.NotStarted = 0)] = "NotStarted"), (s[(s.Running = 1)] = "Running"), (s[(s.Stopped = 2)] = "Stopped");
  })(Bi || (Bi = {}));
  exports.record = lt;
  if (typeof module.exports == "object" && typeof exports == "object") {
    var __cp = (to, from, except, desc) => {
      if ((from && typeof from === "object") || typeof from === "function") {
        for (let key of Object.getOwnPropertyNames(from)) {
          if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
            Object.defineProperty(to, key, {
              get: () => from[key],
              enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
            });
        }
      }
      return to;
    };
    module.exports = __cp(module.exports, exports);
  }
  return module.exports;
});
//# sourceMappingURL=record.umd.min.cjs.map
