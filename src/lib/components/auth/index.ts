import { error } from '@sveltejs/kit';

export const getOrCreateUserProfile = async (locals: App.Locals) => {
	if (!locals.user) {
		return null;
	}

	const curtProfile = await locals.supabase.from('users').select('*').eq('id', locals.user.id);

	if (curtProfile.data?.length !== 0 && curtProfile.data) {
		return curtProfile.data[0];
	}

	const newProfile = await locals.supabase
		.from('users')
		.insert({
			id: locals.user.id,
			fullname: locals.user.user_metadata.full_name,
			img_profile: locals.user.user_metadata.avatar_url || '',
			lang: 'en',
			email: locals.user.email ?? ''
		})
		.select();

	if (!newProfile) {
		error(500, 'Could not create profile');
	}

	return newProfile.data ? newProfile.data[0] : newProfile;
};
