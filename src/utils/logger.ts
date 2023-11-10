import { IRequestType } from '../common/interfaces';

// Log requests during integration tests
const DEBUG_MODE_ENABLED = process.argv.includes('--debug');

const log = (value: string): void => {
  if (DEBUG_MODE_ENABLED) console.debug(value);
};

/**
 * Log request for debugging purposes.
 * @param {object} values - Request values needed for logging.
 * @param {string} values.type - Request type (GET, POST, PUT, DELETE).
 * @param values.payload - Request payload.
 * @param values.body - Request response body.
 * @param values.status - Request response status.
 */
export const logRequest = ({
  type,
  payload,
  body,
  status,
}: {
  type: IRequestType;
  payload: any;
  body: any;
  status: number;
}) => {
  log(
    `Method: ${type}\nStatus: ${status}\nPayload:\n ${JSON.stringify(payload, null, 2)}\nResponse:\n ${JSON.stringify(
      body,
      null,
      2,
    )}`,
  );
};
