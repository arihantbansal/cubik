"use client";
import axios from "axios";

export const searchTeam = async (search: string) => {
  try {
    if (!search || search.length < 3) return [];
    console.log(search);
    const { data } = await axios.get(`/api/search/user?search=${search}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
