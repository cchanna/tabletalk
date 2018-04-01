defmodule Tabletalk.View do
  defmacro __using__(opts) do
    quote do
      def unquote(:to_json)(nil) do
        nil
      end

      def unquote(:by_id)(data) do
        data |> Enum.map(fn x -> {x.id, x |> to_json} end) |> Map.new
      end

      def unquote(:ids)(data) do
        data |> Enum.map(fn x -> x.id end)
      end
    end
  end
end