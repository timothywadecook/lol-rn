import feathers from "@feathersjs/feathers";
import { AsyncStorage } from "react-native";
import rest from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import axios from "axios";

// Instatiate a Client App
const client = feathers();

// Configure RESTful Client Application
// const restClient = rest("http://192.168.1.72:3030");
const restClient = rest("https://www.likeoutloud.app");
client.configure(restClient.axios(axios));
client.configure(auth({ storage: AsyncStorage }));

export let recommendationsService = client.service("recommendations");
export let likesService = client.service("likes");
export let followsService = client.service("follows");
export let commentsService = client.service("comments");
export let usersService = client.service("users");
export let listsService = client.service("lists");
export let thingsService = client.service("things");
export let dislikesService = client.service("dislikes");

export default client;
