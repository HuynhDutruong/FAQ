'use client';

import { useEffect } from 'react';

interface MetaUpdaterProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function MetaUpdater({ title, description, image, url }: MetaUpdaterProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const updateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateNameMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    if (title) {
      updateMeta('og:title', title);
      updateNameMeta('twitter:title', title);
    }

    if (description) {
      updateMeta('og:description', description);
      updateNameMeta('twitter:description', description);
      updateNameMeta('description', description);
    }

    if (image) {
      updateMeta('og:image', image);
      updateNameMeta('twitter:image', image);
    }

    if (url) {
      updateMeta('og:url', url);
    }
  }, [title, description, image, url]);

  return null;
}
