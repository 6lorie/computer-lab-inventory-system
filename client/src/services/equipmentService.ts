import api from "./api";

export async function getEquipment() {
    const res = await api.get("/equipment");

    return res.data;
}

export async function addEquipment(data: any) {
    try {
        const res = await api.post("/equipment", data);

        return res.data;

    } catch (error: any) {

        throw error.response?.data || {
            message: "Failed to add equipment"
        };

    }
}

export async function deleteEquipment(id: number) {
    const res = await api.delete(`/equipment/${id}`);

    return res.data;
}

export async function updateEquipment(id: number, data: any) {
    const res = await api.put(`/equipment/${id}`, data);
    return res.data;
}