import api from "./api";

export async function borrowEquipment(data: any) {
    const res = await api.post("/borrow", data);
    return res.data;
}