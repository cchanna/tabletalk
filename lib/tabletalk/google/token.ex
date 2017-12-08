defmodule Tabletalk.Google.Token do
  alias Tabletalk.Google.Certs

  defp validate_with_certs([], _token) do
    {:error, "Token couldn't be decrypted."}
  end

  defp validate_with_certs([{_key, value} | tail], token) do
    [{:Certificate, der_cert, :not_encrypted} | _rest] = :public_key.pem_decode(value)
    {
      :OTPCertificate, 
      {
        :OTPTBSCertificate, 
        :v3, 
        _serial, 
        _signature, 
        _issuer, 
        _validity, 
        _subject, 
        {
          :OTPSubjectPublicKeyInfo, 
          _alg, 
          {:RSAPublicKey, modulus, exponent}
        },
        _issueruid, 
        _subjectuid, 
        _extensions
      }, 
      _sigalg, 
      _signature2
    } = :public_key.pkix_decode_cert der_cert, :otp

    case JsonWebToken.verify(token, %{alg: "RS256", key: [exponent, modulus]}) do
      {:error, _error} -> validate_with_certs(tail, token)
      result -> result
    end
  end

  defp check_client_id(claims = %{aud: aud}) do
    client_id = Application.get_env(:tabletalk, Tabletalk.Google.Token)[:client_id]

    if aud == client_id do
      {:ok, claims}
    else
      {:error, "Google client ID doesn't match."}
    end
  end

  defp check_issuer(claims = %{iss: "accounts.google.com"}), do: {:ok, claims}
  defp check_issuer(claims = %{iss: "https://accounts.google.com"}), do: {:ok, claims}
  defp check_issuer(%{iss: iss}), do: {:error, "Issuer is invalid. Was: " <> iss <> ", should be: (https://)?accounts.google.com"}

  defp is_expiry_good(date) do
    now = DateTime.utc_now
    case DateTime.compare(date, now) do
      :gt -> {:ok, date}
      _ -> {:error, "Token is expired"}
    end
  end

  defp check_expiry(claims = %{exp: exp}) do
    with {:ok, date} <- DateTime.from_unix(exp),
         {:ok, _date} <- is_expiry_good(date),
         do: {:ok, claims}
  end

  def validate(token) do
    with {:ok, claims} <- Certs.get |> validate_with_certs(token),
         {:ok, claims} <- check_client_id(claims),
         {:ok, claims} <- check_issuer(claims),
         {:ok, claims} <- check_expiry(claims),
         do: {:ok, claims}
  end

  def validate do
    validate "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwM2VkMTIwOTRkNjk3MGEzNDNiOWY5MzAzZjU0Nzg5MGE1NTFmZTgifQ.eyJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk4NDM5MTkzMjgyMjQwODkyMDMiLCJhdF9oYXNoIjoiOVRmbnRBTmpBdVA1NHZ1dWFwZFVGZyIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsImlhdCI6MTUxMjE1NDA5NSwiZXhwIjoxNTEyMTU3Njk1fQ.lR21yKl78h_wQ6bFSB3MlcDm2F3I2qgtQU5IIntbqv6d2JIr92XjUc_887WNfl09NGh7RtRs--Cdcc1ncbq3gAbcUTxxGjkBjUOhZFcSnyDT87wNGGa4ao8ZjO3cC4LW1wkAWLd6tWx9FNuVAGQ7uVIsx6FDjtjMAwTDAoVCvJkRBSEFk2vdabAjlQi6Gg7YAkMyl4oGuBGcwCaFsyKvWtRHh8IJpjlwK-cqfPAyczhs6-ipdHKIcchnKAvjkFAvHsMc9M8sgHWq_dN-BSx5URICqbJAYBWctkcIF2ixfi96PrCesQYqogwBadimsa1oPyjSh-tFijdVBqPC75nd7g"
  end
end