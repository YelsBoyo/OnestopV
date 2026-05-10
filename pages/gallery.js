import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Gallery() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };

    loadUser();
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gallery-images");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load gallery images.");
      }

      setImages(result.images || []);
      setError(null);
    } catch (fetchError) {
      console.error("Error fetching gallery:", fetchError);
      setError(fetchError.message || "Unable to load gallery images.");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setMessage(null);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      setError(uploadError.message || "Failed to upload image.");
      setUploading(false);
      return;
    }

    const { data: urlData, error: urlError } = await supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    if (urlError) {
      setError(urlError.message || "Failed to generate image URL.");
      setUploading(false);
      return;
    }

    const publicUrl = urlData.publicUrl;
    const { error: dbError } = await supabase
      .from("gallery")
      .insert([
        {
          image_url: publicUrl,
          title: file.name,
          description: "Uploaded image",
          uploaded_by: user?.id || null,
        },
      ]);

    if (dbError) {
      setError(dbError.message || "Failed to save image to database.");
    } else {
      setMessage("Image uploaded successfully!");
      fetchImages();
    }
    setUploading(false);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Gallery</h1>
        <p className="mt-4 text-slate-600">A visual look at our farm, harvest process, and fresh produce quality. The latest images are shown at the top.</p>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        {loading ? (
          <p className="text-slate-600">Loading gallery…</p>
        ) : images.length === 0 ? (
          <p className="text-slate-600">No images uploaded yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-3xl bg-slate-100 p-4 text-center text-slate-900 shadow-sm">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="h-40 w-full rounded-3xl object-cover"
                />
                <p className="mt-4 text-lg font-semibold">{image.title}</p>
                <p className="text-sm text-slate-600">{image.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

