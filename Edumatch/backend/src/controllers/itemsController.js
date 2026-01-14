// Base de datos simulada en memoria
let items = [
  { id: 1, name: 'Curso de Matemáticas', description: 'Álgebra y Cálculo', price: 50 },
  { id: 2, name: 'Curso de Física', description: 'Mecánica y Termodinámica', price: 45 },
  { id: 3, name: 'Curso de Química', description: 'Química Orgánica e Inorgánica', price: 40 }
];

// Variable para generar IDs únicos
let nextId = 4;

/**
 * Obtener todos los items
 * GET /api/items
 */
export const getAllItems = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los items'
    });
  }
};

/**
 * Crear un nuevo item
 * POST /api/items
 * Body: { name, description, price }
 */
export const createItem = (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Validación de datos
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        error: 'Los campos name y description son obligatorios'
      });
    }

    // Crear nuevo item
    const newItem = {
      id: nextId++,
      name,
      description,
      price: price || 0
    };

    // Agregar a la base de datos en memoria
    items.push(newItem);

    // Responder con el item creado
    res.status(201).json({
      success: true,
      message: 'Item creado exitosamente',
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el item'
    });
  }
};

/**
 * Eliminar un item por ID
 * DELETE /api/items/:id
 */
export const deleteItem = (req, res) => {
  try {
    const { id } = req.params;
    const itemId = parseInt(id);

    // Buscar el índice del item
    const itemIndex = items.findIndex(item => item.id === itemId);

    // Verificar si existe
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Item con ID ${itemId} no encontrado`
      });
    }

    // Guardar el item eliminado para responder
    const deletedItem = items[itemIndex];

    // Eliminar el item
    items.splice(itemIndex, 1);

    // Responder con éxito
    res.status(200).json({
      success: true,
      message: 'Item eliminado exitosamente',
      data: deletedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el item'
    });
  }
};

/**
 * Obtener un item por ID
 * GET /api/items/:id
 */
export const getItemById = (req, res) => {
  try {
    const { id } = req.params;
    const itemId = parseInt(id);

    const item = items.find(item => item.id === itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: `Item con ID ${itemId} no encontrado`
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el item'
    });
  }
};
