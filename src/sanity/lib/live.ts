// src/sanity/live.ts

import { defineLive } from 'next-sanity';
import { client } from './client';
import { apiVersion } from '../env';

const token = process.env.SANITY_VIEWER_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion: apiVersion,
  }),
  serverToken: token,
  browserToken: token,
});
