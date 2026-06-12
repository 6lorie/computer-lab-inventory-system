import api from "./api";

export async function getEquipment() {
    const res = await api.get("/equipment");

    return res.data;
}

export async function addEquipment(data: any) {
    const res = await api.post("/equipment", data);
    return res.data;
}

export async function deleteEquipment(id: number) {
    const res = await api.delete(`/equipment/${id}`);

    return res.data;
}