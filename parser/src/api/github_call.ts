import axios from 'axios';
import { BaseGitContentModel } from '../models/basic_models';

const BASE_IAGL_URL = "https://api.github.com/repos/zach-morris/plugin.program.iagl/contents/resources/data/dat_files";

export async function getAllSystemXMLs() {
    return (await (axios.get<BaseGitContentModel[]>(BASE_IAGL_URL))).data;
}

export async function getXmlData(url: string) {
    return (await axios.get(url, { responseType: 'text' })).data;
}