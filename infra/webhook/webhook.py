#!/usr/bin/env python3

import http.server
import os
import subprocess

SECRET = os.environ["WEBHOOK_SECRET"]
DEPLOY_SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "deploy.sh")


class WebhookHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        auth = self.headers.get("Authorization", "")

        if auth != "Bearer " + SECRET:
            self.send_response(403)
            self.end_headers()
            return

        subprocess.Popen(["bash", DEPLOY_SCRIPT])
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        pass


server = http.server.HTTPServer(("127.0.0.1", 9000), WebhookHandler)
server.serve_forever()
