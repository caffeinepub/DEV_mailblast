import { u as useQueryClient, j as jsxRuntimeExports, S as Skeleton, a as ue, r as reactExports } from "./index-DZJ9u701.js";
import { c as createLucideIcon, a as useQuery, u as useActor, b as createActor, L as Layout, B as Badge, S as SubscriberStatus, d as Button } from "./backend-Co4QOVaZ.js";
import { u as useMutation, D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, L as Label, I as Input, T as Textarea } from "./dialog-a1pNoK5H.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleLeft = createLucideIcon("toggle-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "15", cy: "12", r: "3", key: "1afu0r" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleRight = createLucideIcon("toggle-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function useBackendActor() {
  return useActor(createActor);
}
function useSubscribers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSubscribers();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddSubscriber() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addSubscriber(name, email);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
function useToggleSubscriberStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.toggleSubscriberStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
function useBulkImportSubscribers() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entries) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bulkImportSubscribers(entries);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
function AddSubscriberDialog() {
  const [open, setOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const { mutate, isPending } = useAddSubscriber();
  function handleSubmit(e) {
    e.preventDefault();
    mutate(
      { name, email },
      {
        onSuccess: () => {
          ue.success("Subscriber added");
          setName("");
          setEmail("");
          setOpen(false);
        },
        onError: (err) => ue.error(err.message)
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", "data-ocid": "add-subscriber-btn", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
      "Add Subscriber"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add Subscriber" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sub-name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "sub-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Jane Smith",
              required: true,
              "data-ocid": "subscriber-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sub-email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "sub-email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "jane@example.com",
              required: true,
              "data-ocid": "subscriber-email-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: isPending,
            "data-ocid": "add-subscriber-submit",
            children: isPending ? "Adding…" : "Add Subscriber"
          }
        )
      ] })
    ] })
  ] });
}
function BulkImportDialog() {
  const [open, setOpen] = reactExports.useState(false);
  const [csv, setCsv] = reactExports.useState("");
  const { mutate, isPending } = useBulkImportSubscribers();
  function handleSubmit(e) {
    e.preventDefault();
    const entries = csv.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
      const [name, email] = line.split(",").map((s) => s.trim());
      return [name ?? "", email ?? ""];
    }).filter(([, email]) => email.includes("@"));
    if (!entries.length) {
      ue.error("No valid entries found. Use format: name,email");
      return;
    }
    mutate(entries, {
      onSuccess: () => {
        ue.success(`Imported ${entries.length} subscriber(s)`);
        setCsv("");
        setOpen(false);
      },
      onError: (err) => ue.error(err.message)
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", "data-ocid": "bulk-import-btn", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
      "Bulk Import"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Bulk Import Subscribers" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "bulk-csv", children: [
            "CSV Data",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(one per line: name,email)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "bulk-csv",
              value: csv,
              onChange: (e) => setCsv(e.target.value),
              placeholder: "Jane Smith,jane@example.com\nJohn Doe,john@example.com",
              rows: 8,
              required: true,
              "data-ocid": "bulk-import-csv-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Lines without a valid email address will be skipped." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: isPending,
            "data-ocid": "bulk-import-submit",
            children: isPending ? "Importing…" : "Import Subscribers"
          }
        )
      ] })
    ] })
  ] });
}
function SubscribersActions() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BulkImportDialog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddSubscriberDialog, {})
  ] });
}
function Subscribers() {
  const { data: subscribers, isLoading } = useSubscribers();
  const { mutate: toggle } = useToggleSubscriberStatus();
  function handleToggle(id) {
    toggle(id, {
      onSuccess: () => ue.success("Status updated"),
      onError: () => ue.error("Failed to update status")
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Subscribers", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(SubscribersActions, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) }) : !(subscribers == null ? void 0 : subscribers.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "text-center py-16 rounded-xl border border-dashed border-border",
      "data-ocid": "subscribers-empty",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No subscribers yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Add your first subscriber to get started." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AddSubscriberDialog, {})
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Date Added" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Action" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border bg-card", children: subscribers.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "hover:bg-muted/20 transition-smooth",
        "data-ocid": "subscriber-row",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: sub.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: sub.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: sub.status === SubscriberStatus.subscribed ? "default" : "secondary",
              children: sub.status
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: new Date(Number(sub.dateAdded) / 1e6).toLocaleDateString(
            void 0,
            { year: "numeric", month: "short", day: "numeric" }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => handleToggle(sub.id),
              "data-ocid": "toggle-subscriber-btn",
              "aria-label": `Toggle ${sub.name} status`,
              children: sub.status === SubscriberStatus.subscribed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-4 h-4 text-muted-foreground" })
            }
          ) })
        ]
      },
      String(sub.id)
    )) })
  ] }) }) }) });
}
export {
  Subscribers as default
};
