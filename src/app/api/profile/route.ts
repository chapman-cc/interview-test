
const userProfile: UserProfile = {
  name: "John Doe",
  email: "john@example.com",
};

export async function POST(request: Request) {
  const { token } = await request.json();
  if (token === "123") {
    return Response.json(userProfile);
  } else {
    return Response.error();
  }
}
