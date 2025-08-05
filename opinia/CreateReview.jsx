// src/components/CreateReview.jsx
import React, { useState } from 'react';
import './CreateReview.css';

// === Subcomponente: StarRating ===
const StarRating = ({ rating, onRate }) => {
  const handleKeyDown = (e, star) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRate(star);
    }
  };

  return (
    <div className="star-rating" role="radiogroup" aria-label="Avaliação do jogo">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-btn ${star <= rating ? 'filled' : ''}`}
          onClick={() => onRate(star)}
          onKeyDown={(e) => handleKeyDown(e, star)}
          role="radio"
          aria-checked={star <= rating}
          tabIndex={0}
          aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// === Subcomponente: SuccessState ===
const SuccessState = ({ onReset }) => (
  <div className="success-state" role="status" aria-live="polite">
    <svg
      className="success-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
    <h3>Opinião enviada com sucesso! 🎉</h3>
    <p>Sua avaliação já está visível na página do jogo.</p>
    <button onClick={onReset} className="btn-primary" type="button">
      Escrever outra opinião
    </button>
  </div>
);

// === Subcomponente: LoadingSpinner ===
const LoadingSpinner = () => (
  <span className="loader" aria-hidden="true"></span>
);

// === Componente Principal ===
const CreateReview = () => {
  const games = [
    { id: 1, title: 'The Legend of Zelda: Tears of the Kingdom' },
    { id: 2, title: 'Elden Ring: Shadow of the Erdtree' },
    { id: 3, title: 'Hollow Knight: Silksong' },
    { id: 4, title: 'Cyberpunk 2077: Phantom Liberty' },
    { id: 5, title: 'God of War Ragnarök' },
  ];

  const [selectedGameId, setSelectedGameId] = useState('');
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Função para limpar apenas um erro específico
  const clearError = (field) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!selectedGameId) newErrors.game = 'Selecione um jogo.';
    if (rating < 1) newErrors.rating = 'Por favor, avalie com 1 a 5 estrelas.';
    if (!title.trim()) newErrors.title = 'O título é obrigatório.';
    else if (title.trim().length < 5)
      newErrors.title = 'O título deve ter pelo menos 5 caracteres.';

    if (!comment.trim()) newErrors.comment = 'O comentário é obrigatório.';
    else if (comment.trim().length < 10)
      newErrors.comment = 'O comentário deve ter pelo menos 10 caracteres.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulação de envio (futuro: API)
    setTimeout(() => {
      console.log('✅ Opinião enviada:', {
        gameId: parseInt(selectedGameId, 10),
        rating,
        title: title.trim(),
        comment: comment.trim(),
        date: new Date().toISOString(),
      });
      setIsSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setSelectedGameId('');
    setRating(0);
    setTitle('');
    setComment('');
    setErrors({});
    setSuccess(false);
  };

  return (
    <section className="create-review-section" aria-labelledby="review-title">
      <div className="container">
        <div className="review-card">
          <header className="review-header">
            <h2 id="review-title">Escreva sua Opinião</h2>
            <p>Compartilhe sua experiência com a comunidade de jogadores</p>
          </header>

          {success ? (
            <SuccessState onReset={handleReset} />
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              {/* Seleção do Jogo */}
              <div className="form-group">
                <label htmlFor="game">Jogo</label>
                <select
                  id="game"
                  value={selectedGameId}
                  onChange={(e) => {
                    setSelectedGameId(e.target.value);
                    clearError('game');
                  }}
                  aria-invalid={!!errors.game}
                >
                  <option value="">Escolha um jogo...</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  ))}
                </select>
                {errors.game && <span className="error">{errors.game}</span>}
              </div>

              {/* Nota */}
              <div className="form-group">
                <label id="rating-label">Nota</label>
                <StarRating
                  rating={rating}
                  onRate={(value) => {
                    setRating(value);
                    clearError('rating');
                  }}
                />
                <div aria-live="polite" className="error-message">
                  {errors.rating && <span className="error">{errors.rating}</span>}
                </div>
              </div>

              {/* Título */}
              <div className="form-group">
                <label htmlFor="title">Título da Opinião</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    clearError('title');
                  }}
                  placeholder="Ex: Uma obra-prima da narrativa e exploração"
                  aria-invalid={!!errors.title}
                />
                {errors.title && <span className="error">{errors.title}</span>}
              </div>

              {/* Comentário */}
              <div className="form-group">
                <label htmlFor="comment">Comentário</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    clearError('comment');
                  }}
                  rows="6"
                  placeholder="Descreva sua experiência: gráficos, jogabilidade, história, trilha sonora, etc."
                  aria-invalid={!!errors.comment}
                />
                {errors.comment && <span className="error">{errors.comment}</span>}
              </div>

              {/* Ações */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner /> Enviando...
                    </>
                  ) : (
                    'Enviar Opinião'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateReview;
