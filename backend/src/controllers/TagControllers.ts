import { Request, Response } from "express";
import Tag, { ITag } from "../models/Tag";
import { generateSlug } from "../helpers";
import Movement from "../models/Movement";

type UpdateTagBody = {
        name?: ITag['name']
        color?: ITag['color']
    }

export class TagController {

    static createTag = async (req: Request<{},{},ITag>, res: Response) => {
        
        try {
            const { name, color } = req.body
            const tag = new Tag({name, color})
            await tag.save()
            return res.status(201).json(tag)

        } catch (error) {
            console.log(error)
            if(error?.code === 11000){
                return res.status(409).json({error: 'tag already exist'})
            }
            return res.status(500).json({error: 'Error creating tag'})
        } 
    }

    static getAllTags = async (req: Request, res: Response) => {
        try {
            const tag = await Tag.find({}).lean()
            res.json(tag)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error fetching tags" })
        }
    }

    static getTagById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const tag = await Tag.findById(id)
            if(!tag){
                const error = new Error('tag not found')
                return res.status(500).json({error: error.message})
            }
            res.json(tag)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error fetching tags" })
        }
    }
    
    static updateTag = async (req: Request<{id:string},{},UpdateTagBody>, res: Response) => {
        try {
            const { id } = req.params
            const { name, color} = req.body

            //find tag
            const tag = await Tag.findById(id)
            if(!tag){
                const error = new Error('tag not found')
                return res.status(404).json({error: error.message})
            }

            //name
            if(typeof name !== 'undefined'){
                const slug = generateSlug(name)
                const exists = await Tag.findOne({
                    slug,
                    _id: {$ne: id}
                })
                if(exists){
                    return res.status(409).json({error: 'tag already exists'})
                }
                tag.name = name
                tag.slug = slug
            }

            //color
            if(typeof color !== 'undefined'){
                tag.color = color
            }
            //save
            await tag.save()

            return res.json({
                message: 'Tag updated',
                tag
            })
            

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error updating tag" })
        }
    }
    
    static deleteTag = async (req: Request<{id:string}>, res: Response) => {
        const { id } = req.params
        try {
            const tag = await Tag.findById(id)
            if(!tag){
                const error = new Error('tag not found')
                return res.status(404).json({error: error.message})
            }
            //check if tag is used in movements
            const isUsed = await Movement.exists({tags: id})
            if(isUsed){
                return res.status(409).json({
                    error: 'Tag is being used by one or more movements'
                })
            } 
            //delete
            await tag.deleteOne()
            return res.json({
                message: 'tag deleted successfully',
                tag
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error deleting tag" })
        }
    }
}