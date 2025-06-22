import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle, resetStatus } from '../store/articleSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../services/axiosInstance';

export default function ArticleEditor() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams(); // For edit mode
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.articles);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`/articles/${id}`);
        const data = res.data;
        setIsEdit(true);
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setCategory(data.category);
        setTags(data.tags.join(', '));
        editor?.commands.setContent(data.content);
      } catch (err) {
        console.error('Error loading article for edit:', err);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, editor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editor?.getHTML();
    if (!title || !excerpt || !category || !content) {
      alert('All fields are required!');
      return;
    }

    const payload = {
      title,
      excerpt,
      category,
      tags: tags.split(',').map((t) => t.trim()),
      content,
    };

    if (isEdit) {
      try {
        await axios.put(`/articles/${id}`, payload);
        alert('✅ Article updated!');
        navigate('/');
      } catch (err) {
        alert('❌ Update failed: ' + err.response?.data?.message || 'Server error');
      }
    } else {
      dispatch(createArticle(payload));
    }
  };

  useEffect(() => {
    if (success) {
      alert('✅ Article created!');
      dispatch(resetStatus());
      navigate('/');
    }
    if (error) {
      alert('❌ ' + error);
    }
  }, [success, error, dispatch, navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? 'Update Article' : 'Write an Article'}
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Short Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <div className="border p-2 rounded mb-4 min-h-[200px]">
          <EditorContent editor={editor} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {loading ? 'Saving...' : isEdit ? 'Update' : 'Publish'}
        </button>
      </form>
    </div>
  );
}

