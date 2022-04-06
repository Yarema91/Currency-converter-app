(this["webpackJsonpreact-pizza"] = this["webpackJsonpreact-pizza"] || []).push([
  [0],
  {
    76: function (e, t, a) {
      e.exports = a(93);
    },
    93: function (e, t, a) {
      "use strict";
      a.r(t);
      var r = a(0),
        n = a.n(r),
        l = a(20),
        c = a.n(l),
        o = a(24),
        i = a(25),
        s = a(12),
        u = a(7),
        m = a(101),
        d = a(64),
        E = Object(d.createApi)({
          reducerPath: "projectAPI",
          baseQuery: Object(d.fetchBaseQuery)({
            baseUrl: "http://localhost:5000/",
          }),
          tagTypes: ["Project"],
          endpoints: function (e) {
            return {
              fetchAllProjects: e.query({
                query: function () {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : 10;
                  return { url: "/projects", params: { _limit: e } };
                },
                providesTags: function (e) {
                  return ["Project"];
                },
              }),
              fetchProjectById: e.query({
                query: function (e) {
                  return { url: "/projects/".concat(e), method: "GET" };
                },
                providesTags: function (e) {
                  return ["Project"];
                },
              }),
              fetchProjectByNameSearch: e.query({
                query: function (e) {
                  return { url: "/projects?q=".concat(e), method: "GET" };
                },
                providesTags: function (e) {
                  return ["Project"];
                },
              }),
              createProject: e.mutation({
                query: function (e) {
                  return { url: "/projects", method: "POST", body: e };
                },
                invalidatesTags: ["Project"],
              }),
              updateProject: e.mutation({
                query: function (e) {
                  return {
                    url: "/projects/".concat(e.id),
                    method: "PUT",
                    body: e,
                  };
                },
                invalidatesTags: ["Project"],
              }),
              deleteProject: e.mutation({
                query: function (e) {
                  return { url: "/projects/".concat(e.id), method: "DELETE" };
                },
                invalidatesTags: ["Project"],
              }),
            };
          },
        }),
        p = function (e) {
          var t = e.project;
          return n.a.createElement(
            "div",
            null,
            n.a.createElement(
              m.a,
              null,
              n.a.createElement(
                m.a.Body,
                null,
                n.a.createElement("img", {
                  className: "ml-3",
                  src: t.imageUrl,
                  width: "96px",
                  alt: "Generic placeholder image",
                }),
                n.a.createElement(m.a.Title, null, t.id, ". ", t.title),
                n.a.createElement(
                  m.a.Text,
                  null,
                  t.body.replace(/(.{58})..+/, "$1...")
                ),
                n.a.createElement(
                  i.b,
                  { to: "/card/".concat(t.id), role: "button" },
                  "More to"
                )
              )
            ),
            n.a.createElement("div", { className: "media" })
          );
        },
        b = function () {
          var e = Object(r.useState)(15),
            t = Object(u.a)(e, 2),
            a = t[0],
            l = (t[1], E.useFetchAllProjectsQuery(a)),
            c = l.data,
            o = l.error,
            i = l.isLoading;
          return n.a.createElement(
            "div",
            null,
            n.a.createElement(
              m.a,
              { border: "success", style: { width: "18rem" } },
              n.a.createElement(
                m.a.Header,
                { style: { color: "green" }, as: "h6" },
                "Active"
              ),
              n.a.createElement(
                "div",
                { style: { height: "42em", overflow: "auto" } },
                i && n.a.createElement("h1", null, "Loading..."),
                o && n.a.createElement("h1", null, "Error download..."),
                c &&
                  c
                    .filter(function (e) {
                      return "active" == e.status;
                    })
                    .map(function (e) {
                      return n.a.createElement(p, { project: e, key: e.id });
                    })
              )
            )
          );
        },
        f = function () {
          var e = Object(r.useState)(10),
            t = Object(u.a)(e, 2),
            a = t[0],
            l = (t[1], E.useFetchAllProjectsQuery(a)),
            c = l.data,
            o = l.error,
            i = l.isLoading;
          return n.a.createElement(
            "div",
            null,
            n.a.createElement(
              m.a,
              { border: "warning", style: { width: "18rem" } },
              n.a.createElement(
                m.a.Header,
                { style: { color: "#FFB700" }, as: "h6" },
                "Process"
              ),
              n.a.createElement(
                "div",
                { style: { height: "42em", overflow: "auto" } },
                i && n.a.createElement("h1", null, "Loading..."),
                o && n.a.createElement("h1", null, "Error download..."),
                c &&
                  c
                    .filter(function (e) {
                      return "process" == e.status;
                    })
                    .map(function (e) {
                      return n.a.createElement(p, { project: e, key: e.id });
                    })
              )
            )
          );
        },
        g = function () {
          var e = E.useFetchAllProjectsQuery(10),
            t = e.data,
            a = e.error,
            r = e.isLoading;
          return n.a.createElement(
            "div",
            null,
            n.a.createElement(
              m.a,
              { border: "info", style: { width: "18rem" } },
              n.a.createElement(
                m.a.Header,
                { style: { color: "#03C5EE" }, as: "h6" },
                "Finish"
              ),
              n.a.createElement(
                "div",
                { style: { height: "42em", overflow: "auto" } },
                r && n.a.createElement("h1", null, "Loading..."),
                a && n.a.createElement("h1", null, "Error download..."),
                t &&
                  t
                    .filter(function (e) {
                      return "finish" == e.status;
                    })
                    .map(function (e) {
                      return n.a.createElement(p, { project: e, key: e.id });
                    })
              )
            )
          );
        },
        h = function () {
          return n.a.createElement(
            "div",
            { style: { display: "flex" } },
            n.a.createElement(
              "span",
              {
                style: {
                  display: "flex",
                  margin: "70px 50px 30px 14.5em",
                  padding: "right:30px",
                },
              },
              n.a.createElement(
                "span",
                { style: { margin: "0 2%" } },
                n.a.createElement(b, null)
              ),
              n.a.createElement(
                "span",
                { style: { margin: "0 2%" } },
                n.a.createElement(f, null)
              ),
              n.a.createElement(
                "span",
                { style: { margin: "0 2%" } },
                n.a.createElement(g, null)
              )
            )
          );
        },
        y = a(2),
        v = a(95),
        j = o.useSelector,
        x = function (e) {
          var t = e.project,
            a = e.update,
            r = e.remove;
          j(function (e) {
            return e.counterReducer.value;
          }),
            Object(o.useDispatch)();
          return n.a.createElement(
            "div",
            null,
            n.a.createElement(
              m.a,
              { style: { width: "70%" } },
              n.a.createElement(
                i.b,
                {
                  "aria-label": "Close",
                  className: "position-absolute top-0 end-0",
                  to: "/projects",
                  style: {
                    color: "black",
                    margin: "0.5em 0.5em 0.5em ",
                    cursor: "pointer",
                    width: "3%",
                    background: "white",
                    borderRadius: "5px",
                  },
                },
                n.a.createElement("i", {
                  className: "bi bi-x-lg",
                  style: { margin: "0.2em 0.2em 0.5em " },
                })
              ),
              n.a.createElement(m.a.Img, { variant: "top", src: t.imageUrl }),
              n.a.createElement(
                m.a.Body,
                null,
                n.a.createElement(m.a.Title, null, " ", t.id, ". ", t.title),
                n.a.createElement(m.a.Text, null, t.body),
                n.a.createElement(
                  v.a,
                  {
                    variant: "primary",
                    className: "me-2",
                    onClick: function (e) {
                      var r = prompt();
                      r && "" !== r && a(Object(y.a)({}, t, { title: r }));
                    },
                  },
                  "Edit"
                ),
                n.a.createElement(
                  v.a,
                  {
                    variant: "primary",
                    onClick: function (e) {
                      e.stopPropagation(),
                        window.confirm("Really delete this project?") &&
                          (r(t), (window.location.href = "/"));
                    },
                  },
                  "Delete"
                )
              )
            )
          );
        },
        w = function () {
          var e = E.useUpdateProjectMutation(),
            t = Object(u.a)(e, 2),
            a = t[0],
            r = t[1],
            l = r.error,
            c = r.isLoading,
            o = E.useDeleteProjectMutation(),
            i = Object(u.a)(o, 2),
            m = i[0],
            d = i[1],
            p = d.error,
            b = d.isLoading,
            f = Object(s.f)().id,
            g = E.useFetchProjectByIdQuery(f),
            h = g.data,
            y = g.error,
            v = g.isLoading;
          console.log(h);
          console.log("id", f);
          return n.a.createElement(
            "div",
            { style: { margin: "5% 2% 30% 20%" } },
            y && n.a.createElement("h1", null, "Error find..."),
            v && n.a.createElement("h1", null, "Loading find by id project..."),
            p && n.a.createElement("h1", null, "Error delete..."),
            b && n.a.createElement("h1", null, "Loading Delete project..."),
            l && n.a.createElement("h1", null, "Error update..."),
            c && n.a.createElement("h1", null, "Loading update project..."),
            h
              ? n.a.createElement(x, {
                  project: h,
                  update: function (e) {
                    a(e);
                  },
                  remove: function (e) {
                    m(e);
                  },
                })
              : n.a.createElement("h1", null, '"Can not fetch details"')
          );
        },
        k = a(67),
        O = a.n(k),
        N = a(73),
        P = a(99),
        C = a(96),
        S = a(97),
        L = a(100),
        T = function (e) {
          var t = e.title,
            a = e.nameButton,
            l = e.children,
            c = e.onHandleSubmit,
            o = e.disabled,
            i = Object(r.useState)(!1),
            s = Object(u.a)(i, 2),
            m = s[0],
            d = s[1],
            E = function () {
              return d(!1);
            };
          return n.a.createElement(
            "div",
            null,
            n.a.createElement(
              v.a,
              {
                variant: "outline-success",
                className: "me-2",
                onClick: function () {
                  return d(!0);
                },
              },
              t
            ),
            n.a.createElement(
              L.a,
              { show: m, onHide: E },
              n.a.createElement(
                L.a.Header,
                { closeButton: !0 },
                n.a.createElement(L.a.Title, null, t)
              ),
              n.a.createElement(L.a.Body, null, l),
              n.a.createElement(
                L.a.Footer,
                null,
                n.a.createElement(
                  v.a,
                  { variant: "secondary", onClick: E },
                  "Close"
                ),
                n.a.createElement(
                  v.a,
                  {
                    variant: "primary",
                    disabled: o,
                    onClick: function () {
                      c(), d(!1);
                    },
                  },
                  a
                )
              )
            )
          );
        },
        I = a(98),
        B = function () {
          var e = Object(r.useState)([]),
            t = Object(u.a)(e, 2),
            a = t[0],
            l = t[1],
            c = Object(r.useState)(""),
            o = Object(u.a)(c, 2),
            s = o[0],
            d = o[1],
            p = E.useFetchAllProjectsQuery(15),
            b = p.data,
            f = p.error,
            g = p.isLoading,
            h = function () {
              l([]), d("");
            };
          return n.a.createElement(
            "div",
            null,
            g && n.a.createElement("h1", null, "Loading search..."),
            f && n.a.createElement("h1", null, "Error searching..."),
            n.a.createElement(
              I.a,
              {
                className: "d-flex",
                style: {
                  display: "flex",
                  paddingLeft: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "1px solid green",
                },
              },
              n.a.createElement("input", {
                type: "text",
                style: {
                  width: "100%",
                  background: "none",
                  border: "0",
                  padding: "0",
                  outline: "none",
                },
                placeholder: "Search",
                "aria-label": "Search",
                onChange: function (e) {
                  var t = e.target.value;
                  if ((d(t), "" === t)) l([]);
                  else {
                    var a =
                      b &&
                      b.filter(function (e) {
                        return e.title.toLowerCase().includes(t.toLowerCase());
                      });
                    l(a);
                  }
                },
                value: s,
              }),
              n.a.createElement(
                v.a,
                {
                  variant: "secondary",
                  style: {
                    backgroundColor: "white",
                    color: "green",
                    textTransform: "uppercase",
                    borderStyle: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    outline: "none",
                  },
                  type: "button",
                  onClick: h,
                },
                0 === s.length
                  ? n.a.createElement("i", { className: "bi bi-search" })
                  : n.a.createElement("i", { className: "bi bi-x-lg" })
              )
            ),
            0 != a.length &&
              n.a.createElement(
                m.a,
                {
                  className: "results",
                  style: {
                    width: "12.1em",
                    overflow: "auto",
                    position: "absolute",
                  },
                },
                a.map(function (e) {
                  return n.a.createElement(
                    i.b,
                    {
                      to: "/card/".concat(e.id),
                      onClick: h,
                      style: { textDecoration: "none" },
                    },
                    e.title
                  );
                })
              )
          );
        },
        F = { imageUrl: "", title: "", body: "" },
        q = function () {
          var e,
            t = E.useCreateProjectMutation(),
            a = Object(u.a)(t, 2),
            l = a[0],
            c = a[1],
            o = c.error,
            s = c.isLoading,
            m = Object(r.useState)(F),
            d = Object(u.a)(m, 2),
            p = d[0],
            b = d[1],
            f = Object(r.useState)({ title: !1 }),
            g = Object(u.a)(f, 2),
            h = g[0],
            j = g[1],
            x = {
              title: [
                {
                  isInvalid: "" === p.title,
                  message: "Title can not be empty",
                },
                {
                  isInvalid:
                    "" !== p.title &&
                    (null === (e = p.title) || void 0 === e
                      ? void 0
                      : e.length) < 3,
                  message: "Title is too short",
                },
              ],
              body: [
                { isInvalid: "" === p.body, message: "Body can not be empty" },
              ],
            },
            w = function (e) {
              var t = x[e];
              return {
                isInvalid: t
                  .map(function (e) {
                    return e.isInvalid;
                  })
                  .some(function (e) {
                    return e;
                  }),
                messages: t
                  .filter(function (e) {
                    return e.isInvalid;
                  })
                  .map(function (e) {
                    return e.message;
                  }),
              };
            },
            k = function () {
              return !w("title").isInvalid && !w("body").isInvalid;
            },
            L = (function () {
              var e = Object(N.a)(
                O.a.mark(function e() {
                  var t, a;
                  return O.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (((t = p.title), (a = p.body), k())) {
                            e.next = 6;
                            break;
                          }
                          e.next = 9;
                          break;
                        case 6:
                          return (
                            (e.next = 8),
                            l({
                              title: t,
                              imageUrl:
                                "https://source.unsplash.com/1600x900/?project-art",
                              body: a,
                              status: "active",
                            })
                          );
                        case 8:
                          b(F);
                        case 9:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })();
          return n.a.createElement(
            P.a,
            { bg: "light", expand: "lg", fixed: "top" },
            n.a.createElement(
              C.a,
              { fluid: !0 },
              n.a.createElement(
                i.b,
                {
                  to: "/projects",
                  role: "button",
                  style: { textDecoration: "none", color: "black" },
                },
                "Logo"
              ),
              n.a.createElement(P.a.Toggle, {
                "aria-controls": "navbarScroll",
              }),
              n.a.createElement(
                P.a.Collapse,
                { id: "navbarScroll" },
                n.a.createElement(S.a, {
                  className: "me-auto my-2 my-lg-0",
                  style: { maxHeight: "100px" },
                  navbarScroll: !0,
                }),
                n.a.createElement(B, null),
                n.a.createElement(S.a, {
                  className: "me-auto my-2 my-lg-0",
                  style: { maxHeight: "100px" },
                  navbarScroll: !0,
                }),
                n.a.createElement(
                  T,
                  {
                    title: "Create Project",
                    nameButton: "Save",
                    onHandleSubmit: L,
                    disabled: !k(),
                  },
                  n.a.createElement(
                    "form",
                    { className: "row g-3", action: "create-form" },
                    n.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      n.a.createElement(
                        "div",
                        { className: "form-outline" },
                        n.a.createElement(
                          "label",
                          {
                            htmlFor: "validationDefault01",
                            className: "form-label",
                          },
                          "Title"
                        ),
                        n.a.createElement("input", {
                          type: "text",
                          className: "form-control",
                          placeholder: "title",
                          value: p.title || "",
                          onChange: function (e) {
                            b(Object(y.a)({}, p, { title: e.target.value })),
                              j(Object(y.a)({}, h, { title: !0 }));
                          },
                        })
                      )
                    ),
                    n.a.createElement(
                      "div",
                      { style: { backgroundColor: "gold" } },
                      h.title && w("title").messages
                    ),
                    n.a.createElement(
                      "div",
                      { className: "" },
                      n.a.createElement(
                        "div",
                        { className: "form-outline" },
                        n.a.createElement(
                          "label",
                          {
                            htmlFor: "validationDefault01",
                            className: "form-label",
                          },
                          "Body"
                        ),
                        n.a.createElement("textarea", {
                          className: "form-control",
                          placeholder: "body",
                          value: p.body || "",
                          onChange: function (e) {
                            b(Object(y.a)({}, p, { body: e.target.value })),
                              j(Object(y.a)({}, h, { body: !0 }));
                          },
                        })
                      )
                    ),
                    n.a.createElement(
                      "div",
                      { style: { backgroundColor: "gold" } },
                      h.body && w("body").messages
                    )
                  )
                ),
                s && n.a.createElement("h1", null, "Loading create project..."),
                o && n.a.createElement("h1", null, "Error creative..."),
                n.a.createElement(v.a, { variant: "success" }, "Log In")
              )
            )
          );
        },
        D = function () {
          return n.a.createElement(
            "div",
            null,
            n.a.createElement(
              "footer",
              {
                className: "text-center text-white",
                style: { backgroundColor: "#F8F8F8" },
              },
              n.a.createElement(
                "div",
                { className: "container pt-4" },
                n.a.createElement(
                  "section",
                  { className: "mb-4" },
                  n.a.createElement(
                    "a",
                    {
                      className:
                        "btn btn-link btn-floating btn-lg text-dark m-1",
                      href: "https://www.linkedin.com/in/yarema-ostrovskiy/",
                      role: "button",
                      "data-mdb-ripple-color": "dark",
                    },
                    n.a.createElement("i", { className: "fab fa-linkedin" }),
                    n.a.createElement("i", { className: "bi bi-linkedin" })
                  ),
                  n.a.createElement(
                    "a",
                    {
                      className:
                        "btn btn-link btn-floating btn-lg text-dark m-1",
                      href: "https://github.com/Yarema91/New_redux_product_app",
                      role: "button",
                      "data-mdb-ripple-color": "dark",
                    },
                    n.a.createElement("i", { className: "bi bi-github" })
                  )
                )
              ),
              n.a.createElement(
                "div",
                {
                  className: "text-center text-dark p-3",
                  style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                },
                "\xa9 2021 Copyright:"
              )
            )
          );
        },
        H = function () {
          return n.a.createElement(
            i.a,
            null,
            n.a.createElement(q, null),
            n.a.createElement(
              s.c,
              null,
              n.a.createElement(s.a, {
                exact: !0,
                path: "/projects",
                component: h,
              }),
              n.a.createElement(s.a, { path: "/card/:id", component: w })
            ),
            n.a.createElement(D, null)
          );
        },
        A = a(8),
        U = a(18),
        Q = a(5),
        R = Object(Q.createSlice)({
          name: "User",
          initialState: { projects: [], isLoading: !1, error: "" },
          reducers: {
            projects: function (e) {
              console.log("projects.state");
            },
          },
        }).reducer,
        z = Object(Q.createSlice)({
          name: "counter",
          initialState: { value: 0 },
          reducers: {
            increase: function (e) {
              e.value += 1;
            },
            decrease: function (e) {
              e.value -= 1;
            },
          },
        }),
        M = z.actions,
        _ = (M.increase, M.decrease, z.reducer),
        G = Object(U.d)(
          Object(A.a)(
            { productReducer: R, counterReducer: _ },
            E.reducerPath,
            E.reducer
          )
        ),
        J =
          (a(92),
          Object(Q.configureStore)({
            reducer: G,
            middleware: function (e) {
              return e().concat(E.middleware);
            },
          })),
        Y = document.getElementById("root");
      c.a.render(
        n.a.createElement(o.Provider, { store: J }, n.a.createElement(H, null)),
        Y
      );
    },
  },
  [[76, 1, 2]],
]);
//# sourceMappingURL=main.f2dcf151.chunk.js.map
