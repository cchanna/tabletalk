defmodule Tabletalk.Guardian do
  use Guardian, otp_app: :tabletalk

  def subject_for_token(nil, _) do
    {:error, "The user id can't be nil"}
  end
  def subject_for_token(user_id, _claims) do
    # You can use any value for the subject of your token but
    # it should be useful in retrieving the resource later, see
    # how it being used on `resource_from_claims/1` function.
    # A unique `id` is a good subject, a non-unique email address
    # is a poor subject.
    {:ok, user_id}
  end

  def resource_from_claims(%{"sub" => user_id}) do
    # Here we'll look up our resource from the claims, the subject can be
    # found in the `"sub"` key. In `above subject_for_token/2` we returned
    # the resource id so here we'll rely on that to look it up.
    {:ok, user_id}
  end
  def resource_from_claims(_claims) do
    {:error, "Claims are invalid"}
  end
end