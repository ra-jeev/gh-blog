const functions = require('firebase-functions');
const { Octokit } = require('@octokit/rest');
const admin = require('firebase-admin');
const cors = require('cors');

const { defineSecret, defineString } = require('firebase-functions/params');
const githubToken = defineSecret('github_token');
const codespaceName = defineString('GITHUB_CODESPACE_NAME');

admin.initializeApp();

exports.startCodespaces = functions
  .region('europe-west1')
  .runWith({ secrets: [githubToken] })
  .https.onRequest(async (req, resp) => {
    functions.logger.info('Incoming startCodespaces req!', {
      structuredData: true,
    });

    cors({ origin: true })(req, resp, async () => {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
      ) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        functions.logger.log('decodedToken', decodedToken);

        if (decodedToken.roles && decodedToken.roles.includes('ADMIN')) {
          const octokit = new Octokit({
            auth: githubToken.value(),
          });

          functions.logger.log('codespace name:', codespaceName.value());
          try {
            const codespace =
              await octokit.codespaces.startForAuthenticatedUser({
                codespace_name: codespaceName.value(),
              });

            functions.logger.log('got some codespace response', codespace);

            return resp.status(200).send(JSON.stringify(codespace.data));
          } catch (error) {
            functions.logger.error(error);
            resp
              .status(500)
              .send(error.message || 'Failed to start the workspace');
          }
        }
      }

      resp.status(401).send('Not authorized');
    });
  });
