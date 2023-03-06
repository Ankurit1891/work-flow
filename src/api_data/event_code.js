import { createServer } from "miragejs";

let server = createServer();
server.get("/api/event_code", {
  codes: [
    { key: 1, text: "Code - 1" },
    { key: 2, text: "Code - 2" },
    { key: 3, text: "Code - 3" },
    { key: 4, text: "Code - 4" },
  ],
});

server.get("/api/pre_transcition_action/alert", {
  data: [
    { key: 1, text: "PRE SEND Email 1" },
    { key: 2, text: "PRE SEND Email 2" },
    { key: 3, text: "PRE SEND Email 3" },
    { key: 4, text: "PRE SEND Email 4" },
  ],
});

server.get("/api/pre_transcition_action/hooks", {
  data: [
    { key: 1, text: "PRE HOOK 1" },
    { key: 2, text: "PRE HOOK 2" },
    { key: 3, text: "PRE HOOK 3" },
    { key: 4, text: "PRE HOOK 4" },
  ],
});

server.get("/api/pre_transcition_action/limit_utilization", {
  data: [
    { key: 1, text: "PRE LIMIT UTILIZATION 1" },
    { key: 2, text: "PRE LIMIT UTILIZATION 2" },
    { key: 3, text: "PRE LIMIT UTILIZATION 3" },
    { key: 4, text: "PRE LIMIT UTILIZATION 4" },
  ],
});

server.get("/api/pre_transcition_action/api_call", {
  data: [
    { key: 1, text: "PRE API Call 1" },
    { key: 2, text: "PRE API Call 2" },
    { key: 3, text: "PRE API Call 3" },
    { key: 4, text: "PRE API Call 4" },
  ],
});

server.get("/api/post_transcition_action/alert", {
  data: [
    { key: 1, text: "POST SEND Email 1" },
    { key: 2, text: "POST SEND Email 2" },
    { key: 3, text: "POST SEND Email 3" },
    { key: 4, text: "POST SEND Email 4" },
  ],
});

server.get("/api/post_transcition_action/hooks", {
  data: [
    { key: 1, text: "POST HOOK 1" },
    { key: 2, text: "POST HOOK 2" },
    { key: 3, text: "POST HOOK 3" },
    { key: 4, text: "POST HOOK 4" },
  ],
});

server.get("/api/post_transcition_action/limit_utilization", {
  data: [
    { key: 1, text: "POST LIMIT UTILIZATION 1" },
    { key: 2, text: "POST LIMIT UTILIZATION 2" },
    { key: 3, text: "POST LIMIT UTILIZATION 3" },
    { key: 4, text: "POST LIMIT UTILIZATION 4" },
  ],
});

server.get("/api/post_transcition_action/api_call", {
  data: [
    { key: 1, text: "API Call 1" },
    { key: 2, text: "API Call 2" },
    { key: 3, text: "API Call 3" },
    { key: 4, text: "API Call 4" },
  ],
});
