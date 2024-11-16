const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//----------------------------------create-event-----------------------------------//  

const createEvent = async (req, res) => {
    try{
    const {title, description} = req.body;

    const userId = req.user?.id;

        if (!userId) {
            return res.status(403).send({ status: 'error', message: 'Unauthorized access. User not found.' });
        }
    
        const event = await prisma.event.create({
            data: {
                title,
                description,
                creator_user_id: userId
            }
        });
        return res.status(201).send({status: 'success', message: 'event created successfully.', data: event});
    } catch (error) {
        console.error(error.stack);
        return res.status(422).send({status: 'error', message: 'Something went wrong. Please check back again.'});
    }

};

//----------------------------------update-event-----------------------------------//

const updateEvent = async (req, res) => {
    try{
    const {title, description} = req.body;
    const {id} = req.params;
    
        const event = await prisma.event.update({
            where: {
                id
            },
            data: {
                title,
                description
            }
        });
        return res.status(200).send({status: 'success', message: 'event updated successfully.', data: event});
    } catch (error) {
        console.error(error.stack);
        return res.status(422).send({status: 'error', message: 'Something went wrong. Please check back again.'});
    }
}

//----------------------------------get-event-by-id-----------------------------------//

const getEventById = async (req, res) => {
try{
    const {id} = req.params;
    const event = await prisma.event.findUnique({
        where: {
            id
        }
    });
    return res.status(200).send({status: 'success', message: 'event retrieved successfully.', data: event});
}

catch(error){
    console.error(error.stack);
    return res.status(422).send({status: 'error', message: 'Something went wrong. Please check back again.'});
}
};      

//----------------------------------index-events-----------------------------------//

const indexEvents = async (req, res) => {

    try {
        const data = req.body;
		const { orderBy = 'created_at', order = 'desc', creator_user_id } = data;
		const page = Number(req.body.page) || 1;
		const take = Number(req.body.limit) ? Number(req.body.limit) : 15;
		const skip = (page - 1) * take;
        const where = creator_user_id ? { creator_user_id } : {};

        const events = await prisma.event.findMany(
            {
			skip,
			take,
			orderBy: { [orderBy]: order },
            where
            }
        );
        return res.status(200).send({ status: 'success', message: 'events retrieved successfully.', data: events });
    } catch (error) {
        console.error(error.stack);
        return res.status(422).send({ status: 'error', message: 'Something went wrong. Please check back again.' });
    }
};

//----------------------------------delete-event-----------------------------------//

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.event.delete({
            where: {
                id
            }
        });
        return res.status(200).send({ status: 'success', message: 'event deleted successfully.' });
    } catch (error) {
        console.error(error.stack);
        return res.status(422).send({ status: 'error', message: 'Something went wrong. Please check back again.' });
    }
};

module.exports = {createEvent, updateEvent, getEventById, indexEvents, deleteEvent};