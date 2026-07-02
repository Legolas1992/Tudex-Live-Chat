import React from "react";

export function VoiceCallOverlay({
  inVoiceCall,
  voiceRoomId,
  selectedChatId,
  isCallMinimized,
  voicePeers,
  isMuted,
  screenStream,
  callVolume,
  currentUser,
  getAvatarGradient,
  toggleMute,
  startScreenShare,
  stopScreenShare,
  setCallVolume,
  setIsCallMinimized,
  leaveVoiceRoom,
  apiUrl,
  activeCallState,
  incomingCallInfo,
  outgoingCallInfo,
  joinVoiceRoom,
  setSelectedChatId,
  setViewMode,
  socketRef,
  setActiveCallState,
  setIncomingCallInfo
}) {
  // Helper to stop ringing (since we encapsulate the state but WebRTC hooks trigger on sockets,
  // we can emit decline/cancel events or call leave/join).
  const rejectCall = () => {
    if (socketRef && socketRef.current && incomingCallInfo) {
      socketRef.current.emit("reject-voice-call", {
        roomId: incomingCallInfo.roomId,
        hostId: incomingCallInfo.hostSocketId
      });
    }
    if (setActiveCallState) setActiveCallState("idle");
    if (setIncomingCallInfo) setIncomingCallInfo(null);
  };

  // 1. Fullscreen Outgoing Call Overlay
  if (activeCallState === "calling" && outgoingCallInfo) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(11, 15, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: getAvatarGradient(selectedChatId),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          boxShadow: '0 0 30px rgba(255, 111, 36, 0.3)',
          marginBottom: '20px',
          animation: 'pulse 1.8s infinite',
          overflow: 'hidden'
        }}>
          <span style={{ fontSize: '3rem' }}>📞</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', margin: '10px 0' }}>{outgoingCallInfo.recipientName}</h2>
        <p style={{ color: '#ff6f24', fontSize: '1.05rem', fontWeight: '600', marginBottom: '40px', animation: 'pulse 1.5s infinite' }}>
          Llamando...
        </p>
        <div>
          <button
            onClick={leaveVoiceRoom}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.2s',
              margin: '0 auto'
            }}
            title="Cancelar llamada"
          >
            🔇
          </button>
        </div>
      </div>
    );
  }

  // 2. Fullscreen Incoming Call Overlay
  if (activeCallState === "incoming" && incomingCallInfo) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(11, 15, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: getAvatarGradient(incomingCallInfo.hostId),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          boxShadow: '0 0 30px rgba(0, 230, 118, 0.3)',
          marginBottom: '20px',
          animation: 'pulse 1.8s infinite',
          overflow: 'hidden'
        }}>
          <span style={{ fontSize: '3rem' }}>📞</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', margin: '10px 0' }}>{incomingCallInfo.hostName}</h2>
        <p style={{ color: '#00e676', fontSize: '1.05rem', fontWeight: '600', marginBottom: '40px' }}>
          Llamada de voz entrante
        </p>
        
        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Accept Button */}
          <button
            onClick={() => {
              if (setSelectedChatId) setSelectedChatId(incomingCallInfo.roomId);
              if (joinVoiceRoom) joinVoiceRoom(incomingCallInfo.roomId, true);
            }}
            style={{
              background: '#00e676',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0, 230, 118, 0.4)',
              transition: 'all 0.2s'
            }}
            title="Aceptar llamada"
          >
            📞
          </button>
          
          {/* Decline Button */}
          <button
            onClick={rejectCall}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.2s'
            }}
            title="Rechazar llamada"
          >
            ❌
          </button>
        </div>
      </div>
    );
  }

  // 3. Floating Call Widget (PIP)
  if (inVoiceCall && (isCallMinimized || voiceRoomId !== selectedChatId)) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        color: '#fff',
        animation: 'slideIn 0.3s ease-out'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} /> En llamada
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
            {voicePeers.length > 0 ? `${voicePeers.length + 1} participantes` : "Esperando..."}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Quick Mute */}
          <button
            onClick={toggleMute}
            style={{
              background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '0.9rem',
              padding: 0
            }}
          >
            {isMuted ? "🔇" : "🎙️"}
          </button>
          
          {/* Maximizar */}
          <button
            onClick={() => {
              if (voiceRoomId && setSelectedChatId) {
                setSelectedChatId(voiceRoomId);
                if (setViewMode) setViewMode("chats");
              }
              if (setIsCallMinimized) setIsCallMinimized(false);
            }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '0.9rem',
              padding: 0
            }}
            title="Maximizar"
          >
            🗖
          </button>

          {/* Hang Up */}
          <button
            onClick={leaveVoiceRoom}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '0.9rem',
              padding: 0
            }}
            title="Desconectar"
          >
            📞
          </button>
        </div>
      </div>
    );
  }

  // 4. Standard Call Overlay (Maximized inside Chat layout)
  if (!inVoiceCall || voiceRoomId !== selectedChatId || isCallMinimized) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', zIndex: 10 }}>
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#16a34a',
              boxShadow: '0 0 10px #16a34a',
              display: 'inline-block'
            }} />
            <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>Llamada de Voz Activa</span>
          </div>
          
          {/* Participant Avatars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px' }}>
            {/* Local User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: currentUser?.avatarUrl ? 'transparent' : getAvatarGradient(currentUser?.avatarColor || currentUser?.id || 'me'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: '700',
                color: '#fff',
                overflow: 'hidden'
              }}>
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="Yo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  (currentUser?.username || "Yo").slice(0, 2).toUpperCase()
                )}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#eee' }}>Tú {isMuted ? '🔇' : '🎙️'}</span>
            </div>

            {/* Remote Peers */}
            {voicePeers.map(peer => (
              <div key={peer.socketId} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: peer.avatarUrl ? 'transparent' : getAvatarGradient(peer.avatarColor || peer.userId),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  color: '#fff',
                  overflow: 'hidden'
                }}>
                  {peer.avatarUrl ? (
                    <img src={peer.avatarUrl} alt={peer.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    peer.username.slice(0, 2).toUpperCase()
                  )}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#eee' }}>{peer.username}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleMute}
            style={{
              background: isMuted ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s',
              padding: 0
            }}
            title={isMuted ? "Activar micrófono" : "Silenciar micrófono"}
          >
            {isMuted ? "🔇" : "🎙️"}
          </button>
          <button
            onClick={screenStream ? stopScreenShare : startScreenShare}
            style={{
              background: screenStream ? '#16a34a' : 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.1rem',
              transition: 'all 0.2s',
              padding: 0
            }}
            title={screenStream ? "Dejar de compartir pantalla" : "Compartir pantalla"}
          >
            🖥️
          </button>
          
          {/* Volume Slider Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '0.8rem', color: '#ccc' }}>🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={callVolume}
              onChange={(e) => setCallVolume(parseInt(e.target.value))}
              style={{
                width: '70px',
                height: '4px',
                accentColor: '#ff6f24',
                cursor: 'pointer'
              }}
              title={`Volumen de llamada: ${callVolume}%`}
            />
          </div>

          <button
            onClick={() => setIsCallMinimized(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}
          >
            🗕 Minimizar
          </button>
          <button
            onClick={leaveVoiceRoom}
            style={{
              background: '#ef4444',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}
          >
            Desconectar
          </button>
        </div>
      </div>

      {/* Screen Share Video Stream Panel */}
      {(screenStream || voicePeers.some(p => p.stream && p.stream.getVideoTracks().length > 0)) && (
        <div style={{
          background: '#0a0f1d',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: '260px',
          position: 'relative'
        }}>
          {screenStream ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <video
                autoPlay
                playsInline
                muted
                ref={el => { if (el && el.srcObject !== screenStream) el.srcObject = screenStream; }}
                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#a855f7', marginTop: '6px', fontWeight: '600' }}>Estás compartiendo tu pantalla</span>
            </div>
          ) : (
            (() => {
              const activeVideoPeer = voicePeers.find(p => p.stream && p.stream.getVideoTracks().length > 0);
              if (!activeVideoPeer) return null;
              return (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <video
                    autoPlay
                    playsInline
                    ref={el => { if (el && el.srcObject !== activeVideoPeer.stream) el.srcObject = activeVideoPeer.stream; }}
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#ff6f24', marginTop: '6px', fontWeight: '600' }}>Pantalla compartida de {activeVideoPeer.username}</span>
                </div>
              );
            })()
          )}
        </div>
      )}
      
      {/* Audio elements to play peer audio streams */}
      <div style={{ display: 'none' }}>
        {voicePeers.map(peer => {
          if (!peer.stream) return null;
          return (
            <audio
              key={peer.socketId}
              autoPlay
              playsInline
              ref={el => {
                if (el && el.srcObject !== peer.stream) {
                  el.srcObject = peer.stream;
                }
                if (el) {
                  el.volume = callVolume / 100;
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
export default VoiceCallOverlay;
