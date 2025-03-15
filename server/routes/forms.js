// Forms API Routes

import express from 'express';
import Forms from '../models/Form.js';

const formsRoute = express.Router();

export const getFormsData = async () => {
    try {
        const forms = await Forms.find();
        console.log(`Retrieved ${forms.length} forms from database`);
        return forms;
    } 
    catch (error) {
        console.error("Error fetching form data:", error);
        throw error;
    }
};
  
//http://localhost:3000/api/forms - show all forms (get)
formsRoute.get("/", async (req, res) => {
    try {
        const forms = await getFormsData();
        res.status(200).json(forms);
    } 
    catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ message: "Failed to fetch forms" });
    }
});

//http://localhost:3000/api/forms/67d5e12fc89740c44a57e254 - by id (get)
formsRoute.get("/:id", async (req, res) => {
    try {
        const form = await Forms.findById(req.params.id);
        if (!form) {
        return res.status(404).json({ message: "Form not found" });
        }
        console.log(`Retrieved form from database: ${form.name}`);
        res.status(200).json(form);
    } 
    catch (error) {
        console.error("Error fetching form data:", error);
        res.status(500).json({ message: "Failed to fetch form" });
    }
});

//http://localhost:3000/api/forms/new - add form (post)
formsRoute.post("/new", async (req, res) => {
    try {
        const { name, email, contactNum, message } = req.body;
        if (!name || !email || !contactNum || !message) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const form = await Forms.create(req.body);
        console.log(`Saved form from ${form.name} to database`);
        res.status(201).json(form);
    } 
    catch (error) {
        console.error("Error saving form data:", error);
        res.status(500).json({ message: "Failed to save form" });
    }
});

//http://localhost:3000/api/forms/67d5e9ceff95f77f4712d313 - to update a form (put)
formsRoute.put("/:id", async (req, res) => {
    try {
        const form = await Forms.findByIdAndUpdate(
        req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        console.log(`Updated form from ${form.name}`);
        res.status(200).json(form);
    } 
    catch (error) {
        console.error("Error updating form data:", error);
        res.status(500).json({ message: "Failed to update form" });
    }
});

//http://localhost:3000/api/forms/67d5e9ceff95f77f4712d313 - to delete a form by id (delete)
formsRoute.delete("/:id", async (req, res) => {
    try {
        const form = await Forms.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        console.log(`Deleted form from ${form.name}`);
        res.status(200).json({ message: "Form successfully deleted", form });
    } 
    catch (error) {
        console.error("Error deleting form data:", error);
        res.status(500).json({ message: "Failed to delete form" });
    }
});

export default formsRoute;





