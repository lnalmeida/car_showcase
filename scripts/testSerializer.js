const fs = require('fs');
const serializeVehicleData = async (vehicle, wishListed = false) => {
    return {
        ...vehicle,
        category: vehicle.category?.name || vehicle.category || "N/A",
        categoryId: vehicle.categoryId || null,
        vehicleBrand: vehicle.brand?.name || vehicle.vehicleBrand || "N/A",
        brandId: vehicle.brandId || null,
        vehicleType: vehicle.type?.name || vehicle.vehicleType || "N/A",
        typeId: vehicle.typeId || null,
        price: vehicle.price ? (typeof vehicle.price.toNumber === "function" ? vehicle.price.toNumber().toFixed(2) : Number(vehicle.price).toFixed(2)) : 0,
        createdAt: vehicle.createdAt ? new Date(vehicle.createdAt).toISOString() : null,
        updatedAt: vehicle.updatedAt ? new Date(vehicle.updatedAt).toISOString() : null,
        wishListed: wishListed,
    };
};

const data = JSON.parse(fs.readFileSync('/tmp/out.json', 'utf8')).vehicles;
Promise.all(data.map(v => serializeVehicleData(v)))
    .then(res => {
        console.log('Serialized length:', res.length);
        console.log('Sample price:', res[0].price);
    })
    .catch(e => console.error('SerialError:', e));
