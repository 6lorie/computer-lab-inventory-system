import api from "./api";

export async function borrowEquipment(data: any) {
    const res = await api.post("/borrow", data);
    return res.data;
}

export async function getBorrowRecords() {
    const res = await api.get("/borrow");
    return res.data;
}

export async function returnEquipment(data: any) {
    const res = await api.post("/borrow/return", data);
    return res.data;
}