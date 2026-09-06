import { MAX_BODY_NODES as e, advanceAvatarPlayback as t, createAvatarPlaybackState as n, pauseAvatarPlayback as r, playAvatarAnimation as i, renderAvatarDefinition as a, renderAvatarFrame as o, resolveAnimation as s, resolveExpression as c, resumeAvatarPlayback as l, sampleAvatarFrame as u, validateAvatarDefinition as d } from "@bible-strong/avatar-core";
import { useEffect as f, useId as p, useImperativeHandle as ee, useLayoutEffect as te, useRef as m, useState as h } from "react";
import { jsx as g, jsxs as _ } from "react/jsx-runtime";
//#region src/Avatar.tsx
var v = /* @__PURE__ */ new WeakSet(), y = 420, b = e + 2, x = () => ({
	random: Math.random,
	reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
}), S = (e, t, n) => {
	if (t.status === "playing") return !0;
	let r = e.expressions[t.activeExpression]?.motion;
	return t.status === "stopped" && !n.reduceMotion && r !== void 0 && (r.eyes !== "none" || r.body !== "none");
}, C = (e) => {
	v.add(e);
}, ne = (e) => {
	if (v.has(e)) return;
	let t = d(e);
	if (!t.ok) throw Error(`Invalid avatar definition: ${t.errors[0]?.message}`);
	v.add(e);
}, re = (e, t) => e.activeAnimation === t.activeAnimation && e.activeExpression === t.activeExpression && e.status === t.status && e.stepIndex === t.stepIndex && e.direction === t.direction && e.phase === t.phase && e.phaseStartedAt === t.phaseStartedAt && e.transitionFrom === t.transitionFrom && e.blinkDueAt === t.blinkDueAt && e.blinkStartedAt === t.blinkStartedAt && e.transitionSnapshot === t.transitionSnapshot && e.directTransition?.from === t.directTransition?.from && e.directTransition?.startedAt === t.directTransition?.startedAt && e.directTransition?.durationMs === t.directTransition?.durationMs && e.directTransition?.transition === t.directTransition?.transition, w = ({ animation: e, expression: t, defaultAnimation: n, defaultExpression: r }) => {
	if (e !== void 0 && t !== void 0) throw Error("Avatar accepts either animation or expression, not both. Animation controls a timeline; expression controls a single target.");
	if (n !== void 0 && r !== void 0) throw Error("Avatar accepts either defaultAnimation or defaultExpression, not both. Choose one uncontrolled initial target.");
}, T = (e, t, r, i, a) => {
	let o = t ?? (r === void 0 ? i : void 0);
	if (o) {
		let t = s(e, o);
		if (t.ok) return {
			...n(),
			activeExpression: t.value.steps[0]?.expression ?? "neutral"
		};
	}
	let l = r ?? (t === void 0 ? a : void 0) ?? "neutral", u = c(e, l);
	return {
		...n(),
		activeExpression: u.ok ? l : "neutral"
	};
};
function E({ definition: e, ref: d, animation: v, expression: C, defaultAnimation: E, defaultExpression: D, autoplay: O, size: k = 240, className: A, style: j, ariaLabel: M = "Procedural avatar", onError: N, onAnimationEnd: P, onExpressionChange: F }) {
	w({
		animation: v,
		expression: C,
		defaultAnimation: E,
		defaultExpression: D
	}), ne(e);
	let I = `${p().replaceAll(":", "")}-head`, L = m(null), R = m(null), z = m(null), B = m(null), V = m([]), H = m([]), U = m(!1), W = m(void 0), G = m(null), K = m(null), q = m(e), [J, Y] = h(() => T(e, v, C, E, D)), X = (e) => {
		R.current?.setAttribute("d", e.geometry.headPath), L.current?.setAttribute("d", e.geometry.headPath), R.current?.setAttribute("fill", e.colors.body), z.current?.setAttribute("d", e.geometry.leftPath), z.current?.setAttribute("fill", e.colors.eyes), z.current?.setAttribute("opacity", e.geometry.leftVisible ? "1" : "0"), B.current?.setAttribute("d", e.geometry.rightPath), B.current?.setAttribute("fill", e.colors.eyes), B.current?.setAttribute("opacity", e.geometry.rightVisible ? "1" : "0"), V.current.forEach((t, n) => {
			t?.setAttribute("d", e.geometry.backPaths[n] ?? ""), t?.setAttribute("fill", e.colors.body);
		}), H.current.forEach((t, n) => {
			t?.setAttribute("d", e.geometry.frontPaths[n] ?? ""), t?.setAttribute("fill", e.colors.body);
		});
	}, Z = (t, n, r) => (K.current = u(e, t, n, r), o(e, t, n, r));
	te(() => {
		let e = G.current ?? J, t = performance.now(), n = x();
		X(Z(e, t, n));
	}), f(() => {
		G.current = J;
	}, [J]), f(() => {
		if (q.current === e) return;
		q.current = e, K.current = null, U.current = !1, W.current = void 0;
		let t = T(e, v, C, E, D);
		G.current = t, Y(t);
	}, [
		v,
		E,
		D,
		e,
		C
	]), f(() => {
		if (v !== void 0 || C !== void 0) return;
		let t = E ? s(e, E) : D ? c(e, D) : null;
		t && !t.ok && (N ? N(t.error) : console.error(`[Avatar] ${t.error.message}`));
	}, [
		v,
		E,
		D,
		e,
		C,
		N
	]), f(() => {
		if (U.current || v !== void 0 || C !== void 0 || E === void 0 || O === !1) return;
		U.current = !0;
		let t = i(e, E, performance.now());
		t.ok && (G.current = t.value, Y(t.value));
	}, [
		v,
		O,
		E,
		e,
		C
	]), f(() => {
		if (C !== void 0) {
			let t = c(e, C);
			if (t.ok) {
				let t = G.current ?? n(), r = performance.now(), i = K.current ?? u(e, t, r, x()), a = {
					...n(),
					activeExpression: C,
					...t.activeExpression === C ? {} : {
						status: "playing",
						directTransition: {
							from: i,
							startedAt: r,
							durationMs: y,
							transition: "smooth"
						}
					}
				};
				G.current = a, Y(a);
			} else N ? N(t.error) : console.error(`[Avatar] ${t.error.message}`);
			return;
		}
		if (v !== void 0) {
			let t = G.current ?? n(), r = performance.now(), a = K.current ?? u(e, t, r, x()), o = i(e, v, r, a);
			o.ok ? (G.current = o.value, Y(o.value)) : N ? N(o.error) : console.error(`[Avatar] ${o.error.message}`);
		}
	}, [
		v,
		e,
		C,
		N
	]), f(() => {
		F?.(J.activeExpression);
	}, [J.activeExpression, F]), f(() => {
		if (!S(e, J, x())) return;
		let n = 0, r = (i) => {
			let a = G.current;
			if (!a) return;
			let o = x(), s = t(e, a, i, o);
			G.current = s, re(a, s) || Y(s), a.status === "playing" && s.status === "stopped" && a.activeAnimation && W.current !== a.activeAnimation && (W.current = a.activeAnimation, P?.(a.activeAnimation));
			let c = Z(s, i, o);
			X(c), S(e, s, o) && (n = requestAnimationFrame(r));
		};
		return n = requestAnimationFrame(r), () => cancelAnimationFrame(n);
	}, [
		e,
		J.activeExpression,
		J.status,
		P
	]);
	let Q = v !== void 0 || C !== void 0;
	ee(d, () => ({
		play(t) {
			if (Q) return {
				ok: !1,
				error: {
					code: "controlled_by_props",
					key: t,
					message: "Playback is controlled by Avatar props."
				}
			};
			let r = G.current ?? n();
			if (r.status === "paused" && r.activeAnimation === t && r.pausedAt !== void 0) {
				let e = performance.now(), t = l(r, e);
				return G.current = t, Y(t), { ok: !0 };
			}
			let a = performance.now(), o = K.current ?? u(e, r, a, x()), s = i(e, t, a, o);
			return s.ok ? (W.current = void 0, G.current = s.value, Y(s.value), { ok: !0 }) : {
				ok: !1,
				error: s.error
			};
		},
		setExpression(t) {
			if (Q) return {
				ok: !1,
				error: {
					code: "controlled_by_props",
					key: t,
					message: "Expression is controlled by Avatar props."
				}
			};
			let r = c(e, t);
			if (!r.ok) return {
				ok: !1,
				error: r.error
			};
			let i = G.current ?? n(), a = performance.now(), o = K.current ?? u(e, i, a, x()), s = {
				...n(),
				activeExpression: t,
				...i.activeExpression === t ? {} : {
					status: "playing",
					directTransition: {
						from: o,
						startedAt: a,
						durationMs: y,
						transition: "smooth"
					}
				}
			};
			return G.current = s, Y(s), { ok: !0 };
		},
		pause() {
			let e = G.current;
			if (!e || e.status !== "playing") return;
			let t = r(e, performance.now());
			G.current = t, Y(t);
		},
		stop() {
			if (!Q) {
				let e = n();
				G.current = e, Y(e);
			}
		},
		getState() {
			let e = G.current ?? n();
			return {
				...e.activeAnimation ? { activeAnimation: e.activeAnimation } : {},
				activeExpression: e.activeExpression,
				status: e.status
			};
		}
	}));
	let $ = a(e);
	return /* @__PURE__ */ g("div", {
		className: ["bs-avatar", A ?? ""].filter(Boolean).join(" "),
		style: {
			...j,
			width: k,
			height: k
		},
		role: "img",
		"aria-label": M,
		children: /* @__PURE__ */ _("svg", {
			className: "bs-avatar__svg",
			viewBox: "-150 -150 300 300",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ g("defs", { children: /* @__PURE__ */ g("clipPath", {
					id: I,
					children: /* @__PURE__ */ g("path", {
						ref: L,
						d: $.geometry.headPath
					})
				}) }),
				Array.from({ length: b }, (e, t) => /* @__PURE__ */ g("path", {
					ref: (e) => {
						V.current[t] = e;
					},
					d: $.geometry.backPaths[t] ?? "",
					fill: $.colors.body
				}, `back-${t}`)),
				/* @__PURE__ */ g("path", {
					ref: R,
					d: $.geometry.headPath,
					fill: $.colors.body
				}),
				/* @__PURE__ */ _("g", {
					clipPath: `url(#${I})`,
					fill: $.colors.eyes,
					children: [/* @__PURE__ */ g("path", {
						ref: z,
						d: $.geometry.leftPath,
						opacity: +!!$.geometry.leftVisible
					}), /* @__PURE__ */ g("path", {
						ref: B,
						d: $.geometry.rightPath,
						opacity: +!!$.geometry.rightVisible
					})]
				}),
				Array.from({ length: b }, (e, t) => /* @__PURE__ */ g("path", {
					ref: (e) => {
						H.current[t] = e;
					},
					d: $.geometry.frontPaths[t] ?? "",
					fill: $.colors.body
				}, `front-${t}`))
			]
		})
	});
}
//#endregion
//#region src/createAvatar.tsx
var D = (e) => {
	let t = e[0];
	return /* @__PURE__ */ Error(t ? `Invalid avatar definition${t.path ? ` at ${t.path}` : ""}: ${t.message}` : "Invalid avatar definition.");
}, O = (e) => {
	let t = (t) => /* @__PURE__ */ g(E, {
		...t,
		definition: e
	});
	return t.displayName = "CreatedAvatar", t;
};
function k(e) {
	let t = d(e);
	if (!t.ok) throw D(t.errors);
	return C(t.value), O(t.value);
}
//#endregion
export { E as Avatar, k as createAvatar };

//# sourceMappingURL=index.js.map