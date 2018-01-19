import { withUrl } from 'common/apiHelpers';

const { get } = withUrl("api/games/$slug")

export const load = (slug, jwt) => get("load", {urlParams: {slug}, jwt});