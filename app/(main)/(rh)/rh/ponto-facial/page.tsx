"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import * as faceapi from "face-api.js"
import { Camera, RefreshCw, UserCheck, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/Header"

export default function PontoFacialPage() {
	const router = useRouter()
	const videoRef = useRef<HTMLVideoElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	
	const [modelsLoaded, setModelsLoaded] = useState(false)
	const [loadingProgress, setLoadingProgress] = useState(0)
	const [isCameraActive, setIsCameraActive] = useState(false)
	const [detectedName, setDetectedName] = useState<string | null>(null)
	const [faceMatcher, setFaceMatcher] = useState<faceapi.FaceMatcher | null>(null)
	const [registeredDescriptor, setRegisteredDescriptor] = useState<Float32Array | null>(null)
	const [isRegistering, setIsRegistering] = useState(false)

	// 1. Load Models on Mount
	useEffect(() => {
		const loadModels = async () => {
			try {
				setLoadingProgress(20)
				const MODEL_URL = "/models"
				
				await Promise.all([
					faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
					faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
					faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				])
				
				setLoadingProgress(100)
				setModelsLoaded(true)
				toast.success("Modelos carregados com sucesso!")
				startVideo()
			} catch (error) {
				console.error("Erro ao carregar modelos:", error)
				toast.error("Falha ao carregar modelos de reconhecimento.")
			}
		}
		loadModels()

		return () => {
			stopVideo()
		}
	}, [])

	// 2. Camera Management
	const startVideo = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ 
				video: { width: 640, height: 480, facingMode: "user" } 
			})
			if (videoRef.current) {
				videoRef.current.srcObject = stream
				setIsCameraActive(true)
			}
		} catch (error) {
			console.error("Erro ao acessar câmera:", error)
			toast.error("Câmera não disponível.")
		}
	}

	const stopVideo = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
			tracks.forEach(track => track.stop())
			setIsCameraActive(false)
		}
	}

	// 3. Real-time Detection Loop
	useEffect(() => {
		let interval: NodeJS.Timeout
		
		if (modelsLoaded && isCameraActive && videoRef.current) {
			interval = setInterval(async () => {
				if (!videoRef.current) return

				const detections = await faceapi
					.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
					.withFaceLandmarks()
					.withFaceDescriptor()

				if (detections) {
					// Draw detection on canvas
					if (canvasRef.current) {
						const displaySize = { width: 640, height: 480 }
						faceapi.matchDimensions(canvasRef.current, displaySize)
						const resizedDetections = faceapi.resizeResults(detections, displaySize)
						
						const ctx = canvasRef.current.getContext("2d")
						if (ctx) {
							ctx.clearRect(0, 0, displaySize.width, displaySize.height)
							// We can draw masks or just use detections for logic
						}
					}

					// Recognition Logic
					if (faceMatcher && detections.descriptor) {
						const match = faceMatcher.findBestMatch(detections.descriptor)
						if (match.label !== "unknown") {
							setDetectedName(match.label)
						} else {
							setDetectedName(null)
						}
					}
				} else {
					setDetectedName(null)
				}
			}, 500)
		}

		return () => clearInterval(interval)
	}, [modelsLoaded, isCameraActive, faceMatcher])

	// 4. Register/Simulation Logic
	const handleRegister = async () => {
		if (!videoRef.current) return
		
		setIsRegistering(true)
		const detections = await faceapi
			.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
			.withFaceLandmarks()
			.withFaceDescriptor()

		if (detections) {
			const descriptor = detections.descriptor
			setRegisteredDescriptor(descriptor)
			
			// Create a matcher with the registered face as "Usuário Teste"
			const labeledDescriptor = new faceapi.LabeledFaceDescriptors(
				"Usuário Teste",
				[descriptor]
			)
			setFaceMatcher(new faceapi.FaceMatcher([labeledDescriptor], 0.6))
			
			toast.success("Rosto cadastrado com sucesso (Local)!")
		} else {
			toast.error("Rosto não detectado para cadastro.")
		}
		setIsRegistering(false)
	}

	const handleBaterPonto = () => {
		if (detectedName) {
			toast.success(`Ponto batido com sucesso para: ${detectedName}`)
			setTimeout(() => router.push("/rh"), 2000)
		} else {
			toast.error("Identidade não confirmada.")
		}
	}

	return (
		<>
			<div className="flex flex-col w-full gap-6">
					{/* Header Info */}
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-4">
							<Button 
								variant="outline" 
								className="bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 cursor-pointer"
								onClick={() => router.back()}
							>
								<ArrowLeft size={16} />
								Voltar
							</Button>
							<h1 className="text-2xl font-bold text-default-orange">Ponto Facial (POC)</h1>
						</div>
						{!modelsLoaded && (
							<div className="flex flex-col items-end gap-2 w-48">
								<span className="text-xs text-[#8E8B87]">Carregando Modelos AI...</span>
								<Progress value={loadingProgress} className="h-1 bg-[#332C24]" />
							</div>
						)}
					</div>

					{/* Layout Columns */}
					<div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
						{/* Video Section */}
						<div className="relative aspect-video bg-black rounded-xl overflow-hidden border-2 border-[#332C24] shadow-2xl">
							{!isCameraActive && (
								<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#8E8B87]">
									<Camera size={48} className="animate-pulse" />
									<span>Aguardando câmera...</span>
								</div>
							)}
							
							<video
								ref={videoRef}
								autoPlay
								muted
								playsInline
								className="w-full h-full object-cover grayscale-[0.3]"
							/>
							
							<canvas
								ref={canvasRef}
								className="absolute inset-0 pointer-events-none"
							/>

							{/* Detection Overlay */}
							{detectedName && (
								<div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-md border border-green-500 px-4 py-2 rounded-full flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
									<UserCheck size={18} className="text-green-500" />
									<span className="text-sm font-bold text-white uppercase tracking-wider">{detectedName}</span>
								</div>
							)}
						</div>

						{/* Controls Section */}
						<div className="flex flex-col gap-6 p-6 bg-[#1A1510] border border-[#332C24] rounded-xl">
							<div className="space-y-4">
								<h3 className="text-[#8E8B87] uppercase text-xs font-bold tracking-[0.2em]">Status do Sistema</h3>
								
								<div className="flex items-center gap-3">
									<div className={`w-2 h-2 rounded-full ${modelsLoaded ? 'bg-green-500' : 'bg-red-500'}`} />
									<span className="text-sm">{modelsLoaded ? 'Modelos Ativos' : 'Carregando AI...'}</span>
								</div>
								
								<div className="flex items-center gap-3">
									<div className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-green-500' : 'bg-red-500'}`} />
									<span className="text-sm">{isCameraActive ? 'Câmera OK' : 'Sem Câmera'}</span>
								</div>
							</div>

							<div className="h-px bg-[#332C24] w-full" />

							<div className="flex flex-col gap-4">
								{/* Only for POC: Register simulation */}
								<div className="p-4 bg-[#14100C] border border-[#332C24] border-dashed rounded-lg flex flex-col gap-3">
									<p className="text-[10px] text-[#8E8B87] text-center leading-relaxed">
										Para testar, posicione seu rosto e clique abaixo para cadastrar seu padrão facial localmente.
									</p>
									<Button 
										variant="secondary" 
										className="bg-white text-black hover:bg-white/90 font-bold h-10 w-full cursor-pointer transition-all active:scale-95"
										onClick={handleRegister}
										disabled={!isCameraActive || isRegistering}
									>
										{isRegistering ? (
											<RefreshCw size={16} className="animate-spin" />
										) : (
											<ShieldCheck size={18} className="mr-2" />
										)}
										Cadastrar Face
									</Button>
								</div>

								{/* Main Action */}
								<Button 
									className={`h-16 text-lg font-black uppercase tracking-widest rounded-lg transition-all ${
										detectedName 
											? 'bg-default-orange text-black hover:bg-default-orange/90 shadow-[0_0_20px_rgba(255,179,0,0.3)] cursor-pointer' 
											: 'bg-[#332C24] text-[#8E8B87] cursor-not-allowed grayscale'
									}`}
									disabled={!detectedName}
									onClick={handleBaterPonto}
								>
									Bater Ponto
								</Button>
							</div>

							<div className="mt-auto flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
								<AlertCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
								<p className="text-[10px] text-blue-200/70 leading-normal italic">
									Info: Esta versão utiliza reconhecimento local para fins de demonstração.
								</p>
							</div>
						</div>
					</div>
				</div>
			</>
	)
}
