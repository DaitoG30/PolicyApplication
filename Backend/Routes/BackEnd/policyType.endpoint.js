import { Router } from "express";
import {createPolicyType, getPolicyTypes} from "../../Controllers/policy.controller.js";


const policyTypeEndpoint = new Router()

policyTypeEndpoint.post("/", createPolicyType)

policyTypeEndpoint.get("/", getPolicyTypes)



export default policyTypeEndpoint