import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { parseResponse } from '../utils/parseResponse';
import { MeController } from '../controllers/MeController';
import { parseProtectedEvent } from '../utils/parseProtectedEvent';
import { unauthorized } from '../utils/http';

export async function handler(event: APIGatewayProxyEventV2) {
    try {
        const request = parseProtectedEvent(event)
        const response = await MeController.handle(request)

        return parseResponse(response)
    } catch {
        return parseResponse(
            unauthorized({ error: 'Invalid token' })
        )
    }
}