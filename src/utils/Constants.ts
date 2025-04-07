export const initialNodes = [
  {
    id: "1",
    type: "addLead",
    position: { x: 420, y: 120 },
    data: {},
    draggable: false,
  },
  {
    id: "2",
    type: "plainText",
    position: { x: 420, y: 300 },
    data: { label: "Sequence Start Point" },
    draggable: false,
  },
  {
    id: "3",
    type: "addBlock",
    position: { x: 500, y: 420 },
    data: {},
    draggable: false,
  },
];

export const initialEdges = [{ id: "e2-3", source: "2", target: "3" }];

export const dropDownMenuItems = [
  {
    key: "1",
    label: "Save and Paused",
  },
];

export const EditorPlugins = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "media",
  "table",
  "code",
  "help",
  "wordcount",
];

export const EditorToolbars =
  "undo redo | blocks | " +
  "bold italic forecolor | alignleft aligncenter " +
  "alignright alignjustify | bullist numlist outdent indent | " +
  "removeformat | help";
