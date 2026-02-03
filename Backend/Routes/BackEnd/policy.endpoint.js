import { Router } from "express";
import {
    createPolicy, createPolicyResponse,
    deletePolicy,
    getAllPolicies,
    getPolicy, getPolicyResponse,
    updatePolicy
} from "../../Controllers/policy.controller.js";
import policyTypeEndpoint from "./policyType.endpoint.js";


const policyEndpoint = new Router()

policyEndpoint.post('/getresponse',createPolicyResponse)

policyEndpoint.post('/response',getPolicyResponse)

policyEndpoint.get('/', getAllPolicies)

policyEndpoint.get('/:id', getPolicy)

policyEndpoint.post('/', createPolicy)

policyEndpoint.put('/:id', updatePolicy)

policyEndpoint.delete('/:id', deletePolicy)


export default policyEndpoint


