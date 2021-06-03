const tasksList = [
  { _id: 1, title: "Release the course", status: "backlog" },
  { _id: 2, title: "Sit back and relax", status: "backlog" },
  { _id: 3, title: "Work on projects", status: "inProgress" },
  { _id: 4, title: "Listen to music", status: "inProgress" },
  { _id: 5, title: "Being cool", status: "complete" },
  { _id: 6, title: "Getting stuff done", status: "complete" },
  { _id: 7, title: "Being uncool", status: "onHold" },
];

const channels = [
  {label: "backlog", style: "backlogColumn"},
  {label: "inProgress", style: "progressColumn"},
  {label: "complete", style: "completeColumn"},
  {label: "onHold", style: "onHoldColumn"}
];
// const channels = ["backlog", "inProgress", "complete", "onHold"];
const labelsMap = {
  backlog: "Backlog",
  inProgress: "In Progress",
  complete: "Complete",
  onHold: "On Hold",
};


export { tasksList, channels, labelsMap };



// export const data = [
//   {
//     name: "Backlog",
//     style: "backlogColumn",
//     contents: [
//       "Release the course",
//       "Sit back and relax",
//     ],
//   },
//   {
//     name: "In Progress",
//     style: "progressColumn",
//     contents: [
//       "Work on projects",
//       "Listen to music",
//     ],
//   },
//   {
//     name: "Complete",
//     style: "completeColumn",
//     contents:   [
//       "Being cool",
//       "Getting stuff done",
//     ],
//   },
//   {
//     name: "On Hold",
//     style: "onHoldColumn",
//     contents:   [
//       "Being uncool",
//     ]
//   },
// ];
