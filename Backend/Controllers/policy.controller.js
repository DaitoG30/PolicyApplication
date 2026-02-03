import {Policy} from "../Database-Manager/Models/policy.model.js";
import {PolicyResponse} from "../Database-Manager/Models/policyResponse.model.js";
import {PolicyType} from "../Database-Manager/Models/policyType.model.js";
import {where} from "sequelize";




export const createPolicyResponse = async (req, res) => {

    try{
        const {id, user} = req.body

        console.log(id,user)
        const policyResponse = await PolicyResponse.findAll({
            where:
                {
                    PolicyId: id,
                    user: user
                }
        })


        if (!policyResponse.length) {
            const policyRes = await PolicyResponse.create({
                user: user,
                PolicyId: id,
            })

            await policyRes.save()
            res.status(200).json({
                success: true,
            })
        } else {
            res.status(400).json({
                success: false,
                message: `Policy ${id} already exists`
            })
        }
    }
    catch(err){
        res.status(400).json({
            success: false,
        })
    }




}


export const getPolicyResponse = async(req, res) => {
    try{
        const {id, user} = req.body;

        const polciyres = await PolicyResponse.findAll({
            where:
                {
                    PolicyId: id,
                    user: user
                }
        })
        if (polciyres.length) {
            res.status(200).json({
                status: true,
            })
            console.log('True')
        }
        else {
            res.status(200).json({
                status: false,
            })
        }
    }catch(err){
        res.status(400).json({
            status: false,
        })
    }
}

export const createPolicyType = async (req, res) => {

    try{

        const {name, description, link, type} = req.body;

        // Check if the policy already exists
        const policyType = await PolicyType.findAll({
            where: {
                policyType: name
            }
        })

        console.log(policyType)

        if (!policyType.length) {

            // Create the new policy if it doesn't exist already
            const policyType = await PolicyType.create({
                policyType: name,
                description: description,
            })

            await policyType.save()

            return res.status(201).json({
                success: true,
                message: 'Created new Policy Type',
                policy: policyType,
            })

        } else {
            res.status(400).json({
                success: false,
                message: `Policy Type already exists`,
            })
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: `Error: ${error}`,
        })
    }
}

export const getPolicyTypes = async (req, res) => {

    try {
        const policyType = await PolicyType.findAll()

        if (policyType.length) {
            
            const types = []
            
            policyType.forEach(type => {

                const tmpType = {
                    "id": type.id,
                    "name": type.policyType,
                }

                types.push(tmpType)
            })

            res.status(200).json({
                success: true,
                policyTypes: types
            })
        }
        else{
            res.status(400).json({
                success: false,
                message: "No policy types found"
            })
        }

    }
    catch (error) {
        res.status(500).send({
            error: error,
        })
    }
}



// Add a new policy to the Database
export const createPolicy = async (req, res) => {

    try{
        const {name, description, link, type} = req.body;

        // Check if the policy already exists
        const policy = await Policy.findAll({
            where: {
                name: name
            }
        })
        
        console.log(policy)
        
        if (!policy.length) {

            // Create the new policy if it doesn't exist already
            const policy = await Policy.create({
                name: name,
                description: description,
                link: link,
                PolicyTypeId: type
            })

            await policy.save()

            return res.status(201).json({
                success: true,
                message: 'Created new Policy',
                policy: policy,
            })

        } else {
            res.status(400).json({
                success: false,
                message: `Policy already exists`,
            })
        }
    }
    catch (error){
        res.status(400).json({
            success: false,
            message: `Error: ${error}`,
        })
    }

}



// Delete a select policy from the Database PERMANENTLY
export const deletePolicy = async (req, res) => {

    const { id } = req.params

    // Check if the policy really exists
    const policy = await Policy.findAll({
        where: {
            id: id
        }
    })
    console.log(policy)

    if (policy.length) {

        await policy[0].destroy()

        return res.status(201).json({
            success: true,
            message: 'Deleted Policy',
        })
    }
    else {
        res.status(404).json({
            success: false,
            message: 'Policy not Found : Most likely does not exist',
        })
    }

}

// Retrieve all information regarding a single policy
export const getPolicy = async (req, res) => {

    const { id } = req.params

    // Check to see if the policy exists
    const policy = await Policy.findAll({
        where: {
            id: id
        }
    })
    if (policy.length) {

        res.status(201).json({
            success: true,
            message: 'Policy found!',
            policy: policy,
        })

    }
    else {
        res.status(404).json({
            success: false,
            message: 'Policy not Found : Most likely does not exist',
        })
    }

}

// Retrieve all information regarding all available policy
export const getAllPolicies = async (req, res) => {

    const policies = await Policy.findAll({})

    if (policies.length) {



        const policy = []

        policies.forEach(type => {

            const tmpPolicy = {
                "id": type.id,
                "name": type.name,
                "link": type.link,
                "status": false
            }

            policy.push(tmpPolicy)
        })





        res.status(201).json({
            success: true,
            Policies: policy,
        })
    } else {
        res.status(404).json({
            success: false,
            message: 'No Policies Found',
        })
    }

}

//Edit or Update an existing policy from the Database
export const updatePolicy = async (req, res) => {

    const { id } = req.params
    const { name, description, link, type } = req.body

    const policy = await Policy.findAll({
        where: {
            id: id
        }
    })

    if (policy.length) {
        await policy[0].update({
            name: name,
            description: description,
            link: link,
            type: type,
        })

        await policy[0].save()

    }
    else{
        res.status(400).json({
            success: false,
            message: 'Policy not Found',
        })
    }
}


