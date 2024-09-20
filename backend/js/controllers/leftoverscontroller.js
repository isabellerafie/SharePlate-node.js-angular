const express =require('express'),
    leftoversrouter =express.Router()

const leftoverservice=require('../services/leftoverServices')

leftoversrouter.get('/',async(req,res)=>{ 
  const leftover=await leftoverservice.getLeftovers() 
    res.send(leftover); 
})   
leftoversrouter.get('/restaurant/:accountId', async (req, res) => {
    try {
        const accountId = req.params.accountId;
        
        // Call service function to get available leftovers for the restaurant
        const availableLeftovers = await leftoverservice.getAllLeftoversByRestaurantId(accountId);
        res.status(200).json(availableLeftovers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message:'An error occurred while fetching available leftovers'});
    }
});
leftoversrouter.get('/restaurant/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Call the service function to get restaurant information
        const restaurantInfo = await leftoverservice.getRestaurantProfileById(userId);
        res.status(200).json(restaurantInfo);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message:'An error occurred while fetching restaurant information'});
    }
});
leftoversrouter.get('/org/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Call the service function to get organization information
        const organizationInfo = await leftoverservice.getOrganizationProfileById(userId);
        res.status(200).json(organizationInfo);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while fetching organization information' });
    }
});

leftoversrouter.put('/rest/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(req.body)
        const newProfile = req.body; // Assuming the request body contains the updated profile

        // Call the service function to update the restaurant profile
        await leftoverservice.updateRestaurantProfile(userId, newProfile);
        
        res.status(200).json({ message: 'Restaurant profile updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while updating restaurant profile' });
    }
});
leftoversrouter.put('/org/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const newProfile = req.body; // Assuming the request body contains the updated profile

        // Call the service function to update the organization profile
        await leftoverservice.updateOrganizationProfile(userId, newProfile);
        
        res.status(200).json({ message: 'Organization profile updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while updating organization profile' });
    }
});

leftoversrouter.delete('/:leftover_id', async (req, res) => {
  try {
    
      const leftoverId = req.params.leftover_id;
      const affectedRows = await leftoverservice.deleteLeftoverById(leftoverId);
      //console.log('Affected rows:', affectedRows); // Log the number of affected rows
      if (affectedRows>0) {
          res.status(200).json({message:`Leftover with ID ${leftoverId} deleted successfully`});
      } else {
          res.status(404).json({message:`Leftover with ID ${leftoverId} not found`});
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({message:'An error occurred while deleting the leftover'});
  }
});

leftoversrouter.get('/active/restaurant/:accountId', async (req, res) => {
    try {
        const accountId = req.params.accountId;
        
        // Call service function to get available leftovers for the restaurant
        const availableLeftovers = await leftoverservice.getLeftoversByRestaurantId(accountId);
        res.status(200).json(availableLeftovers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message:'An error occurred while fetching available leftovers'});
    }
  });
leftoversrouter.get('/active', async (req, res) => {
  const activeLeftovers = await leftoverservice.getActiveLeftoversSummary();
  res.send(activeLeftovers);
});
// Define a route to get all leftovers of a restaurant
leftoversrouter.get('/restaurant/all/:restaurant_id', async (req, res) => {
  try {
      const restaurantId = req.params.restaurant_id;
      // Call the service function to get all leftovers of the restaurant
      const allLeftovers = await leftoverservice.getAllLeftoversByRestaurantId(restaurantId);
      res.status(200).json(allLeftovers);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({message:'An error occurred while fetching all leftovers'});
  }
});

leftoversrouter.get('/:leftover_id',async(req,res)=>{
    const leftover=await leftoverservice.getLeftoversById(req.params.leftover_id)
    if(leftover.length==0)//handle the case where the row with the id  does not exist
    res.status(404).json('no record with given id :' +req.params.leftover_id)
  else
    res.send(leftover)   
  })     
  

  /*leftoversrouter.post('/', upload.single('leftover_image'), async (req, res) => {
    try {  
        console.log('Received request to add leftover:', req.body); // Log the request body
        console.log('Received file:', req.file); // Log the uploaded file
        const leftoverData = {
            type: req.body.type,
            name: req.body.name,
            quantity: req.body.quantity,
            expiry_date: req.body.expiry_date,
            status: req.body.status,
            restaurant_id: req.body.restaurant_id,
            leftover_image_path: req.file ? req.file.path : null // Set the leftover image path to the uploaded file path, if available
        };
        console.log('Leftover data:', leftoverData); // Log the leftoverData object
        await leftoverservice.addLeftover(leftoverData);
        res.status(201).json('Leftover added successfully');
    } catch (error) {
        console.error('Error adding leftover:', error);
        res.status(500).send('An error occurred while adding the leftover');
    }
});*/





/*router.post('/', async (req, res) => {
  const { type, name, quantity, expiry_date } = req.body; // Extract data from request body
  try {
      await service.addOrEditLeftover({
          p_type: type,
          p_name: name,
          p_quantity: quantity,
          p_expiry_date: expiry_date
      });
      res.status(201).send('Leftover added successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while adding the leftover');
  }
});*/
   
  /*in body of postman request we do like:
  {
    "p_type": "some_type_value",
    "p_name": "some_name_value",
    "p_quantity": 10,
    "p_expiry_date": "2024-04-10",
    "p_status": "1",
    "p_restaurant_id": 1
} and we set the method to post and then send the request */

leftoversrouter.put('/:leftover_id', async (req, res) => { 
  const leftoverId = req.params.leftover_id;
  try {   
      const affectedRows = await leftoverservice.editLeftover(leftoverId, req.body);
      if (affectedRows > 0) {
          res.status(200).json({message:`Leftover with ID ${leftoverId} updated successfully`});
      } else {
          res.status(404).json({message:`Leftover with ID ${leftoverId} not found`}); 
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({message:'An error occurred while updating the leftover'});
  }
});

leftoversrouter.patch('/:leftover_id/remove-quantity/:quantity', async (req, res) => {
  const leftoverId = req.params.leftover_id;
  const quantityToRemove = req.params.quantity;
  const affectedRows = await leftoverservice.reserveQuantityFromLeftover(leftoverId, quantityToRemove);
  if (affectedRows > 0) {
      res.status(200).json({message:`Removed ${quantityToRemove} quantity from leftover with ID ${leftoverId}`});
  } else {
      res.status(404).json({message:`Leftover with ID ${leftoverId} not found or quantity already depleted`});
  }
});

leftoversrouter.patch('/:leftover_id/Add-quantity/:quantity', async (req, res) => {
  const leftoverId = req.params.leftover_id;
  const quantityToRemove = req.params.quantity;
  const affectedRows = await leftoverservice.addQuantityToLeftover(leftoverId, quantityToRemove);
  if (affectedRows > 0) {
      res.status(200).json({message:`Added ${quantityToRemove} quantity to leftover with ID ${leftoverId}`});
  } else {
      res.status(404).json({message:`Leftover with ID ${leftoverId} not found `});
  }
});


module.exports =leftoversrouter;